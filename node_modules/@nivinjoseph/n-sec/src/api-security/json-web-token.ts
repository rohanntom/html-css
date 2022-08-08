import { Claim } from "./claim";
import { InvalidOperationException } from "@nivinjoseph/n-exception";
import { given } from "@nivinjoseph/n-defensive";
import { InvalidTokenException } from "./invalid-token-exception";
import { AlgType } from "./alg-type";
import { Hmac } from "./../crypto/hmac";
// import { DigitalSignature } from "./../crypto/digital-signature";
import { ExpiredTokenException } from "./expired-token-exception";


// public
export class JsonWebToken
{
    private readonly _issuer: string;
    private readonly _algType: AlgType;
    private readonly _key: string;
    private readonly _isfullKey: boolean;
    private readonly _expiry: number;
    private readonly _claims: Array<Claim>;

    
    public get issuer(): string { return this._issuer; }
    public get algType(): AlgType { return this._algType; }
    public get key(): string { return this._key; }
    public get canGenerateToken(): boolean { return this._isfullKey; }
    public get expiry(): number { return this._expiry; }
    public get isExpired(): boolean { return this._expiry <= Date.now(); }
    public get claims(): ReadonlyArray<Claim> { return this._claims; }
    
    
    private constructor(issuer: string, algType: AlgType, key: string, isFullKey: boolean, expiry: number,
        claims: Array<Claim>)
    {
        given(issuer, "issuer").ensureHasValue().ensureIsString();
        given(algType, "algType").ensureHasValue().ensureIsEnum(AlgType);
        given(key, "key").ensureHasValue().ensureIsString();
        given(isFullKey, "isFullKey").ensureHasValue().ensureIsBoolean();
        given(expiry, "expiry").ensureHasValue().ensureIsNumber();
        given(claims, "claims").ensureHasValue().ensureIsArray()
            .ensure(t => t.isNotEmpty, "cannot be empty");
        
        this._issuer = issuer.trim();
        this._algType = algType;
        this._key = key.trim();
        this._isfullKey = isFullKey;
        this._expiry = expiry;
        this._claims = [...claims];
    }
    
    public static fromClaims(issuer: string, algType: AlgType, key: string, expiry: number,
        claims: Array<Claim>): JsonWebToken
    {
        return new JsonWebToken(issuer, algType, key, true, expiry, claims);
    }

    public static fromToken(issuer: string, algType: AlgType, key: string, token: string): JsonWebToken
    {
        given(issuer, "issuer").ensureHasValue();
        given(algType, "algType").ensureHasValue().ensureIsEnum(AlgType);
        given(key, "key").ensureHasValue();
        given(token, "token").ensureHasValue();

        issuer = issuer.trim();
        key = key.trim();
        token = token.trim();

        const tokenSplitted = token.split(".");
        if (tokenSplitted.length !== 3)
            throw new InvalidTokenException(token, "format is incorrect");

        const headerString = tokenSplitted[0];
        const bodyString = tokenSplitted[1];
        const signature = tokenSplitted[2];

        const header: Header = JsonWebToken._toObject(headerString) as Header;
        const body: any = JsonWebToken._toObject(bodyString);

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (header.iss === undefined || header.iss === null)
            throw new InvalidTokenException(token, "iss was not present");

        if (header.iss !== issuer)
            throw new InvalidTokenException(token,
                `iss was expected to be '${issuer}' but instead was '${header.iss}'`);

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (header.alg === undefined || header.alg === null)
            throw new InvalidTokenException(token, "alg was not present");

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (header.alg !== algType)
            throw new InvalidTokenException(token,
                `alg was expected to be '${algType}' but instead was '${header.alg}'`);

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (header.exp === undefined || header.exp === null)
            throw new InvalidTokenException(token, "exp was not present");

        if (typeof header.exp !== "number")
            throw new InvalidTokenException(token, `exp value '${header.exp}' is invalid`);

        if (header.exp <= Date.now())
            throw new ExpiredTokenException(token);

        // if (algType === AlgType.hmac)
        // {
        //     let computedSignature = await Hmac.create(key, headerString + "." + bodyString);
        //     if (computedSignature !== signature)
        //         throw new InvalidTokenException(token, "signature could not be verified");    
        // }   
        // else
        // {
        //     let verification = await DigitalSignature.verify(key, headerString + "." + bodyString, signature);
        //     if (!verification)
        //         throw new InvalidTokenException(token, "signature could not be verified");  
        // }    

        const computedSignature = Hmac.create(key, headerString + "." + bodyString);
        if (computedSignature !== signature)
            throw new InvalidTokenException(token, "signature could not be verified");

        const claims = new Array<Claim>();
        for (const item in body)
            claims.push(new Claim(item, body[item]));

        return new JsonWebToken(issuer, algType, key, false, header.exp, claims);
    }

    private static _toObject(hex: string): object
    {
        const json = Buffer.from(hex.toLowerCase(), "hex").toString("utf8");
        const obj = JSON.parse(json) as object;
        return obj;
    }
    
    public generateToken(): string
    {
        if (!this._isfullKey)
            throw new InvalidOperationException("generating token using an instance created from token");    
        
        const header: Header = {
            iss: this._issuer,
            alg: this._algType,
            exp: this._expiry
        };
        
        const body: any = {};
        this._claims.forEach(t => body[t.type] = t.value);
        
        const headerAndBody = this._toHex(header) + "." + this._toHex(body);
        
        // let signature = this._algType === AlgType.hmac
        //     ? await Hmac.create(this._key, headerAndBody)
        //     : await DigitalSignature.sign(this._key, headerAndBody);
        
        const signature = Hmac.create(this._key, headerAndBody);
        
        const token = headerAndBody + "." + signature;
        return token;
    }
    
    private _toHex(obj: object): string
    {
        const json = JSON.stringify(obj);
        const hex = Buffer.from(json, "utf8").toString("hex");
        return hex.toUpperCase();
    }
}


interface Header
{
    iss: string;
    alg: AlgType;
    exp: number;
}
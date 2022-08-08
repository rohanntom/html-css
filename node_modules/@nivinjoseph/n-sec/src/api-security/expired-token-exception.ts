import { Exception } from "@nivinjoseph/n-exception";
import { given } from "@nivinjoseph/n-defensive";


// public
export class ExpiredTokenException extends Exception
{
    private readonly _token: string;
    
    
    public get token(): string { return this._token; }
    
    
    public constructor(token: string)
    {
        given(token, "token").ensureHasValue().ensureIsString();
        token = token.trim();
        super(`Token '${token}' is expired.`);
        this._token = token;
    }
}
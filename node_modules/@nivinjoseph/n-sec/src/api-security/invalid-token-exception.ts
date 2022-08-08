import { Exception } from "@nivinjoseph/n-exception";
import { given } from "@nivinjoseph/n-defensive";


// public
export class InvalidTokenException extends Exception
{ 
    private readonly _token: string;
    private readonly _reason: string;
    
    
    public get token(): string { return this._token; }
    public get reason(): string { return this._reason; }
    
    
    public constructor(token: string, reason: string)
    {
        given(token, "token").ensureHasValue().ensureIsString();
        given(reason, "reason").ensureHasValue().ensureIsString();
        
        token = token.trim();
        super(`Token '${token}' is invalid because ${reason}.`);
        this._token = token;   
        this._reason = reason;
    }
}
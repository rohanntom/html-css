import { given } from "@nivinjoseph/n-defensive";

export class SecurityToken
{
    private readonly _scheme: string;
    private readonly _token: string;
    
    
    public get scheme(): string { return this._scheme; }
    public get token(): string { return this._token; }
    
    
    public constructor(scheme: string, token: string)
    {
        given(scheme, "scheme").ensureHasValue().ensureIsString()
            .ensure(t => !t.contains(" "), "cannot contain space");
        this._scheme = scheme;
        
        given(token, "token").ensureHasValue().ensureIsString()
            .ensure(t => !t.contains(" "), "cannot contain space");
        this._token = token;   
    }
    
    
    public toString(): string
    {
        return `${this._scheme} ${this._token}`;
    }
}
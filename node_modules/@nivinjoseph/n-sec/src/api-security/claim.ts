import { given } from "@nivinjoseph/n-defensive";


// public
export class Claim
{
    private readonly _type: string;
    private readonly _value: unknown;
    
    
    public get type(): string { return this._type; }
    public get value(): unknown { return this._value; }
    
    
    public constructor(type: string, value: unknown)
    {
        given(type, "type").ensureHasValue().ensureIsString();
        
        this._type = type.trim();
        this._value = value;
    }
    
    
    public equals(claim: Claim): boolean
    {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (claim == null)
            return false;

        if (claim === this)
            return true;

        return this.type === claim.type && this.value === claim.value;
    }
}
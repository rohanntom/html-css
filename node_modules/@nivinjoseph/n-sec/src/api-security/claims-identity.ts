import { Claim } from "./claim";
import { given } from "@nivinjoseph/n-defensive";


// public
export class ClaimsIdentity
{
    private readonly _claims: Array<Claim>;


    public get claims(): ReadonlyArray<Claim> { return this._claims; }


    public constructor(claims: ReadonlyArray<Claim>)
    {
        given(claims, "claims").ensureHasValue().ensureIsArray();

        this._claims = [...claims];
    }


    public hasClaim(claim: Claim): boolean
    {
        return this._claims.some(t => t.equals(claim));
    }
}
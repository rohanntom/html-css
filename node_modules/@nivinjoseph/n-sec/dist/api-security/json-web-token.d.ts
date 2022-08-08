import { Claim } from "./claim";
import { AlgType } from "./alg-type";
export declare class JsonWebToken {
    private readonly _issuer;
    private readonly _algType;
    private readonly _key;
    private readonly _isfullKey;
    private readonly _expiry;
    private readonly _claims;
    get issuer(): string;
    get algType(): AlgType;
    get key(): string;
    get canGenerateToken(): boolean;
    get expiry(): number;
    get isExpired(): boolean;
    get claims(): ReadonlyArray<Claim>;
    private constructor();
    static fromClaims(issuer: string, algType: AlgType, key: string, expiry: number, claims: Array<Claim>): JsonWebToken;
    static fromToken(issuer: string, algType: AlgType, key: string, token: string): JsonWebToken;
    private static _toObject;
    generateToken(): string;
    private _toHex;
}

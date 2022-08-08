export declare class Claim {
    private readonly _type;
    private readonly _value;
    get type(): string;
    get value(): unknown;
    constructor(type: string, value: unknown);
    equals(claim: Claim): boolean;
}

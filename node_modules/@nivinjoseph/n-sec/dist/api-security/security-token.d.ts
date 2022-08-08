export declare class SecurityToken {
    private readonly _scheme;
    private readonly _token;
    get scheme(): string;
    get token(): string;
    constructor(scheme: string, token: string);
    toString(): string;
}

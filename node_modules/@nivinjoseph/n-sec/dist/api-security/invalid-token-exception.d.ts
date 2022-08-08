import { Exception } from "@nivinjoseph/n-exception";
export declare class InvalidTokenException extends Exception {
    private readonly _token;
    private readonly _reason;
    get token(): string;
    get reason(): string;
    constructor(token: string, reason: string);
}

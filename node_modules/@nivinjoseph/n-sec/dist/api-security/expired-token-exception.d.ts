import { Exception } from "@nivinjoseph/n-exception";
export declare class ExpiredTokenException extends Exception {
    private readonly _token;
    get token(): string;
    constructor(token: string);
}

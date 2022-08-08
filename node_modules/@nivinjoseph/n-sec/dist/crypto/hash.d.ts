export declare class Hash {
    private constructor();
    static create(value: string): string;
    static createUsingSalt(value: string, salt: string): string;
}

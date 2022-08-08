export declare class PropertyInfo {
    private readonly _name;
    private readonly _descriptor;
    get name(): string;
    get descriptor(): PropertyDescriptor;
    constructor(name: string, descriptor: PropertyDescriptor);
}

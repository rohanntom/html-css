export class PropertyInfo
{
    private readonly _name: string;
    private readonly _descriptor: PropertyDescriptor;


    public get name(): string { return this._name; }
    public get descriptor(): PropertyDescriptor { return this._descriptor; }


    public constructor(name: string, descriptor: PropertyDescriptor)
    {
        this._name = name;
        this._descriptor = descriptor;
    }
} 
import { given } from "@nivinjoseph/n-defensive";
import { LineItem } from "./lineItem";

export class LineItemService implements LineItem
{
    private readonly _count: number = 200;
    private _itemId: string;
    private _productName: string;
    private _quantity: number;
    private _mrp: number;
    // private _amount: number;
    // private _tax: number;
    // private _amountWithTax: number;

    public get count(): number { return this._count; }
    public get itemId(): string { return this._itemId; }
    public get productName(): string { return this._productName; }
    public get quantity(): number { return this._quantity; }
    public get mrp(): number { return this._mrp; }
    public get amount(): number { return parseFloat((this.quantity * this.mrp).toFixed(2)); }
    public get tax(): number { return parseFloat((this.amount * 0.18).toFixed(2)); }
    public get amountWithTax(): number { return parseFloat((this.amount + this.tax).toFixed(2));}

    public constructor(productName: string, quantity:number, mrp: number)
    {
        given(productName, "productName").ensureHasValue().ensureIsString();
        this._productName = productName;

        given(quantity, "quantity").ensureHasValue().ensureIsNumber();
        this._quantity = quantity;

        given(mrp, "mrp").ensureHasValue().ensureIsNumber();
        this._mrp = mrp;

        this._itemId = "LIN22X" + ++this._count;
    }
}
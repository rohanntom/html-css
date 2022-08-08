import { LineItem } from "../../models/lineItem";
import { LineItemService } from "../../models/lineItem-service";
import { Invoice } from "./invoice";

export class InvoiceService implements Invoice
{
    private readonly _count: number = 2200;
    private _lineItems: Array<LineItemService> = [];
    private _invoiceId: string;
    private _date: number;

    public get count(): number { return this._count; }
    public get lineItems(): Array<LineItemService> { return this._lineItems; }
    public get invoiceId(): string { return this._invoiceId; }
    public get date(): number { return this._date; }
    public get amount(): number { return this.lineItems.reduce((acc, lineItem) => acc + lineItem.amount, 0); }
    public get tax(): number { return this.lineItems.reduce((acc, lineItem) => acc + lineItem.tax, 0); }
    public get amountWithTax(): number { return parseFloat((this.amount + this.tax).toFixed(2)); }

    public constructor()
    {
        this._invoiceId = "INV22X" + ++this._count;
        this._date = Date.now();
    }

    public addItem(productName: string, quantity: number, mrp: number): void { 
        const lineItem = new LineItemService(productName, quantity, mrp);
        this._lineItems.push(lineItem);
    }

    public removeItem(lineItem: LineItem): void {
        const indexOfItem = this.lineItems.findIndex((e) => e.itemId === lineItem.itemId);
        if (indexOfItem === -1)
            return;
        this.lineItems.splice(indexOfItem, 1);
    }
}
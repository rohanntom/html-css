import {LineItem} from "../../models/lineItem";
import { LineItemService } from "../../models/lineItem-service";

export interface Invoice 
{
    count: number;

    lineItems: Array<LineItemService>;

    invoiceId: string;
    date: number;

    get amount(): number;
    get tax(): number;
    get amountWithTax(): number;

    addItem(productName: string, quantity: number, mrp: number): void;
    removeItem(lineItem: LineItem): void;

    // get amount() {
    //     return this.lineItems.reduce((acc, lineItem) => acc + lineItem.amount, 0);
    // }
    // get tax() {
    //     return this.lineItems.reduce((acc, lineItem) => acc + lineItem.tax, 0);
    // }
    // get amountWithTax() {
    //     return parseFloat((this.amount + this.tax).toFixed(2));
    // }

    // constructor() {
    //     this.invoiceId = "INV22X" + ++this._count;
    //     this.date= Date.now();
    // }

    // public addItem(productName: string, quantity: number, mrp: number): void {
    //     const lineItem = new LineItem(productName, quantity, mrp);
    //     this.lineItems.push(lineItem);
    // }

    // public removeItem(lineItem: LineItem) {
    //     const indexOfItem = this.lineItems.findIndex((e) => e.itemId === lineItem.itemId);
    //     if (indexOfItem === -1)
    //         return;
    //     this.lineItems.splice(indexOfItem, 1);
    // }
}
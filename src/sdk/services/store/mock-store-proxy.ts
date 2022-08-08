import { Invoice } from "../../proxies/invoice/invoice";
import { InvoiceService } from "../../proxies/invoice/invoice-service";
import { Store } from "./store";

export class MockStoreProxy implements Store{
    private readonly _invoices: Array<Invoice>;
    private _currentInvoice: InvoiceService;


    public get invoices(): Array<Invoice> { return this._invoices; }
    public get currentInvoice(): InvoiceService { return this._currentInvoice; }
    public get totalAmount(): number { return parseFloat((this.invoices.reduce((acc, invoice) => acc + invoice.amount, 0)).toFixed(2)); }
    public get totalTax(): number { return parseFloat((this.invoices.reduce((acc, invoice) => acc + invoice.tax, 0)).toFixed(2)); }
    public get totalAmountWithTax(): number {  return parseFloat((this.totalAmount + this.totalTax).toFixed(2)); }

    public constructor()
    {
        this._invoices = this.invoices;
        this._currentInvoice = this.currentInvoice;
    }
  
    public createInvoice(): void 
    {
        this._currentInvoice = new InvoiceService();
        this._invoices.push(this._currentInvoice);

    }

    public submitInvoice(): void 
    {
        if (this._currentInvoice.lineItems.length === 0) {
            alert('Invoice is empty!!! Add an item.');
        }
        else {
            this._invoices.push(this._currentInvoice);
            
        }
    }

    public getAllInvoices(): Array<Invoice> 
    {
        return this.invoices;
    }

    // public clearInvoice(): void {
    //     this._currentInvoice = null;
    // }
}        
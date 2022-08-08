import { Invoice } from "../../proxies/invoice/invoice";
import { InvoiceService } from "../../proxies/invoice/invoice-service";

export interface Store{
    invoices: Array<Invoice>;
    currentInvoice: InvoiceService;

    get totalAmount(): number;
    get totalTax(): number;
    get totalAmountWithTax(): number;

    createInvoice(): void;
    submitInvoice(): void;
    getAllInvoices():Array<Invoice>;



    // get totalAmount(): number{
    //     return (this.invoices.reduce((acc, invoice) => acc + invoice.amount, 0)).toFixed(2);
    // }
    // get totalTax(): number {
    //     return (this.invoices.reduce((acc, invoice) => acc + invoice.tax, 0)).toFixed(2);
    // }

    // get totalAmountWithTax(): number {
    //     return (parseFloat(this.totalAmount) + parseFloat(this.totalTax)).toFixed(2);
    // }
}
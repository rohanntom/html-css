import { PageViewModel, route, template } from "@nivinjoseph/n-app"; // Default Imports
 // Import all the possible Routes
import "./new-invoice-view.scss"; // Importing the Styles
import { inject } from "@nivinjoseph/n-ject";
import { Routes } from "../routes";

import { Invoice } from "../../../sdk/proxies/invoice/invoice";
import { InvoiceService } from "../../../sdk/proxies/invoice/invoice-service";
import { given } from "@nivinjoseph/n-defensive";

@template(require("./new-invoice-view.html"))
@route(Routes.invoicePage)
@inject("MockInvoiceService")
export class NewInvoiceViewModel extends PageViewModel
{
    private readonly _invoiceService: InvoiceService;
    private _invoice: ReadonlyArray<Invoice>;

    public get invoiceService(): InvoiceService { return this._invoiceService; }
    public get invoice(): ReadonlyArray<Invoice> { return this._invoice }
      // .where(t => !t.isDeleted); }

    public constructor(invoiceService: InvoiceService){
        super();
        if(this.invoice.length === 0)
            return;
        given(invoiceService, "invoiceService").ensureHasValue().ensureIsObject();
        this._invoiceService = invoiceService;
        this._invoice = [];
    }

}
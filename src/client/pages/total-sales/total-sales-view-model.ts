import { PageViewModel, template, route } from "@nivinjoseph/n-app";
import "./total-sales-view.scss"; // importing css for the template
import { inject } from "@nivinjoseph/n-ject";
import { given } from "@nivinjoseph/n-defensive";

import { Routes } from "../routes";
import { Store } from "../../../sdk/services/store/store";

@template(require("./total-sales-view.html"))
@route(Routes.totalSalesPage)
@inject("StoreService")
export class TotalSalesViewModel extends PageViewModel
{
    private readonly _storeService: Store;
    //private _invoices: ReadonlyArray<Invoice>;
    // private _totalAmount: number;
    // private _totalTax: number;
    // private _totalAmountWithTax: number;

    public get invoicesLength(): number { return this._storeService.invoices.length; }
    public get totalAmount(): number { return this._storeService.totalAmount; }
    public get totalTax(): number { return this._storeService.totalTax; }
    public get totalAmountWithTax(): number { return this._storeService.totalAmountWithTax; }

    public constructor(storeService: Store){
        super();
        given(storeService,"storeService").ensureHasValue().ensureIsObject();
        this._storeService = storeService;
    }
}
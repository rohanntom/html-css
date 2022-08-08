import { PageViewModel, template, route } from "@nivinjoseph/n-app";
import "./input-lineItem-view.scss";
import { inject } from "@nivinjoseph/n-ject";
import { given } from "@nivinjoseph/n-defensive";
import { Validator, strval } from "@nivinjoseph/n-validate";
import { Routes } from "../routes";
import { MockInvoiceService } from "../../../sdk/proxies/invoice/mock-invoice-proxy";

@template(require("./input-lineItem-view.html"))
@route(Routes.invoicePage)
@inject("InvoiceService","NavigationService")
export class InputLineItemViewModel extends PageViewModel
{
    private readonly _invoiceService: MockInvoiceService;
    private readonly _navigationService: NavigationService;

    private _productName: string;
    private _quantity: number;
    private _mrp: number;
    private readonly _validator: Validator<this>;

    public get productName(): string { return this._productName; }
    public set productName(value: string) { this._productName = value; }

    public get quantity(): number { return this._quantity; }
    public set quantity(value: number) { this._quantity = value; }

    public get mrp(): number { return this._mrp; }
    public set mrp(value: number) { this._mrp = value; }

    public get hasErrors(): boolean { return !this._validate(); }
    public get errors(): Record<string, any> { return this._validator.errors; }

    public constructor(invoiceService: MockInvoiceService, navigationService: NavigationService)
    {
        super();
        given(invoiceService, "invoiceService").ensureHasValue();
        given(navigationService, "navigationService").ensureHasValue();

        this._invoiceService = invoiceService;
        this._navigationService = navigationService;
        this._productName = "";
        this._quantity = NaN;
        this._mrp = NaN;
        this._validator =this._createValidator();
    }

    public async save(): Promise<void>
    {
        this._validator.enable();
        if(!this._validate())
            return;
        
        try
        {
            await this._invoiceService.addItem(this._productName, this._quantity, this._mrp);
        }
        catch(e)
        {
            return;
        }

        this._navigationService.navigate(Routes.invoicePage);
    }

    private _validate(): boolean
    {
        this._validator.validate(this);
        return this._validator.isValid;
    }

    private _createValidator(): Validator<this>
    {
        const validator = new Validator<this>(true);

        validator
            .prop("productName")
            .isRequired().withMessage("Product name is required")
            .isString()
            .useValidationRule(strval.hasMaxLength(50));
        
        validator
            .prop("quantity")
            .isRequired().withMessage("Quantity is required")
            .isNumber()
            .hasMinValue(1);

        validator
            .prop("mrp")
            .isRequired().withMessage("MRP is required")
            .isNumber()
            .hasMinValue(0.01);

        return validator;
    }
}
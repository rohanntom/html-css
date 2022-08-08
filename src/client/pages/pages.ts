import { NewInvoiceViewModel } from "./new-invoice/new-invoice-view-model";
import { InputLineItemViewModel } from "./input-lineItem/input-lineItem-view-model";
import { TotalSalesViewModel } from "./total-sales/total-sales-view-model";
import { AllInvoicesViewModel } from "./all-invoices/all-invoices-view-model";


export const pages: Array<Function> = [
  NewInvoiceViewModel,
  InputLineItemViewModel,
  TotalSalesViewModel,
  AllInvoicesViewModel
];
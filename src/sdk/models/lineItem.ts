export interface LineItem {
    // count: number = 200;
    count: number;
    itemId: string;
    productName: string;
    quantity: number;
    mrp: number;

    get amount(): number;
    get tax(): number;
    get amountWithTax(): number;

    // get amount() {
    //     return parseFloat((this.quantity * this.mrp).toFixed(2));
    // }
    // get tax() {
    //     return parseFloat((this.amount * 0.18).toFixed(2));
    // }
    // get amountWithTax() {
    //     return parseFloat((this.amount + this.tax).toFixed(2));
    // }

    // constructor(productName: string, quantity: number, mrp: number) {
    //     this.itemId = "LIN22X" + ++this.count;
    //     this.productName = productName;
    //     this.quantity = quantity;
    //     this.mrp = mrp;
    // }
}
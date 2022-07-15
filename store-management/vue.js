"use strict";
class LineItem {
    static _count = 200;

    get amount() {
        return parseFloat((this.quantity * this.mrp).toFixed(2));
    }
    get tax() {
        return parseFloat((this.amount * 0.18).toFixed(2));
    }
    get amountWithTax() {
        return parseFloat((this.amount + this.tax).toFixed(2));
    }

    constructor(productName, quantity, mrp) {
        this.itemId = "LIN22X" + ++LineItem._count;
        this.productName = productName;
        this.quantity = quantity;
        this.mrp = mrp;
    }
}

class Invoice {
    static _count = 2200;

    lineItems = [];

    get amount() {
        return this.lineItems.reduce((acc, lineItem) => acc + lineItem.amount, 0);
    }
    get tax() {
        return this.lineItems.reduce((acc, lineItem) => acc + lineItem.tax, 0);
    }
    get amountWithTax() {
        return parseFloat((this.amount + this.tax).toFixed(2));
    }

    constructor() {
        this.invoiceId = "INV22X" + ++Invoice._count;
        this.date = Date.now();
    }

    addItem(productName, quantity, mrp) {
        const lineItem = new LineItem(productName, quantity, mrp);
        this.lineItems.push(lineItem);
    }

    removeItem(lineItem) {
        const indexOfItem = this.lineItems.findIndex((e) => e.itemId === lineItem.itemId);
        if (indexOfItem === -1)
            return;
        this.lineItems.splice(indexOfItem, 1);
    }
}

Vue.component('input-form', {
    model: {
        prop: 'invoice',
        event: 'add-item'
    },

    props: ['invoice'],

    template: `
     <form class="lineItem-form" @submit.prevent="onSubmit">
           <p v-if="errors.length">
           <b>Please correct the following error(s):</b>
           <ul>
               <li v-for="error in errors">{{ error }}</li>
           </ul>
           </p>
           <div class="form">
               <label for="productName">Product Name</label>
               <input type="text" id="productName" class="form-control" v-model="productName">
           </div>
           <div class="form">
               <label for="quantity">Quantity</label>
               <input type="number" id="quantity" class="form-control" v-model="quantity">
           </div>
           <div class="form">
               <label for="mrp">MRP</label>
               <input type="number" id="mrp" class="form-control" v-model="mrp">
           </div>
       <button class="button">Add Item</button>
     </form>`,

    data() {
        return {
            productName: null,
            quantity: null,
            mrp: null,
            errors: []
        };
    },

    methods: {
        onSubmit() {
            if (this.productName && this.quantity && this.mrp) {
                this.invoice.addItem(this.productName, this.quantity, this.mrp);
                this.$emit('add-item', this.invoice);
                this.productName = null;
                this.mrp = null;
                this.quantity = null;
                this.$emit('on-item-added');
            }

            else {
                if (!this.productName) this.errors.push("Product Name required.");
                if (!this.quantity) this.errors.push("Quantity required.");
                if (!this.mrp) this.errors.push("MRP required.");
            }
        },
    },
});

Vue.component('line-items-table', {
    props: ['items'],
    template: `
   <table class = "lineItems-listing">
   <thead>
       <tr>
           <th>Item Id</th>
           <th>Product Name</th>
           <th>Quantity</th>
           <th>MRP</th>
           <th>Amount</th>
           <th>Tax</th>
           <th>Total</th>                    
       </tr>
   </thead>

    <tbody class="lineItems">
       <tr v-for="lineItem of items">
           <td>{{ lineItem.itemId }}</td>
           <td>{{ lineItem.productName }}</td>
           <td>{{ lineItem.quantity }}</td>
           <td>{{ lineItem.mrp }}</td>
           <td>{{ lineItem.amount }}</td>
           <td>{{ lineItem.tax }}</td>
           <td>{{ lineItem.amountWithTax }}</td>
           <td><i class="fas fa-trash" @click="onDelete(lineItem)"></i></td>
       </tr>
    </tbody>
   </table>`,

    methods: {
        onDelete(lineItem) {
            this.$emit('on-delete-pressed', lineItem);
        }
    }
});

Vue.component('invoices-page', {
    props: ['invoices'],

    template: `
    <table class="invoice-listing">
       <thead>
           <tr>
               <th>Date</th>
               <th>Invoice ID</th>
               <th>Total Amount</th>                  
           </tr>
       </thead>

       <tbody class="invoices">
        <tr v-for="invoice of invoices">
           <td>{{ invoice.date }}</td>
           <td>{{ invoice.invoiceId }}</td>
           <td>{{ invoice.amountWithTax }}</td>
        </tr>
       </tbody>
      </tbody>
    </table>`,
});

var store = new Vue({
    el: '#container',
    data: {
        invoices: [],
        currentInvoice: null,
        selectedTab: 'homePage'
    },

    methods: {
        createInvoice() {
            this.currentInvoice = new Invoice();
            this.selectedTab = 'invoicePage';
        },

        removeItem(lineItem) {
            const shouldDelete = confirm('Are you sure you want to delete [' + lineItem.productName + '] ?');
            if (!shouldDelete)
                return;
            this.currentInvoice.removeItem(lineItem);
        },

        submitInvoice() {
            if (this.currentInvoice.lineItems.length === 0) {
                alert('Invoice is empty!!! Add an item.');
            }
            else {
                this.invoices.push(this.currentInvoice);
                this.selectedTab = 'isInvoiceCompleted';
            }
        },

        clearInvoice() {
            this.currentInvoice = null;
            this.selectedTab = 'homePage';
        }
    },

    computed: {
        totalAmount() {
            return (this.invoices.reduce((acc, invoice) => acc + invoice.amount, 0)).toFixed(2);
        },

        totalTax() {
            return (this.invoices.reduce((acc, invoice) => acc + invoice.tax, 0)).toFixed(2);
        },

        totalAmountWithTax() {
            return (parseFloat(this.totalAmount) + parseFloat(this.totalTax)).toFixed(2);
        }
    }
});
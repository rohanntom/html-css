class LineItem{
    constructor(productName, quantity, mrp){
       this.itemId = "LI22N" + ++LineItem.count;
       this.productName = productName;
       this.quantity = quantity;
       this.mrp = mrp;
       this.amount = (quantity * mrp).toFixed(2);
       this.tax = (this.amount * 0.18).toFixed(2);
       this.amountWithTax = (parseFloat(this.amount) + parseFloat(this.tax)).toFixed(2);
    }  
    static count = 200;
}

class Invoice{
  constructor(lineItems){
      this.invoiceId = "INV22X" + ++Invoice.count;
      this.lineItems = lineItems;
      this.amount = 0.00;
      this.amountWithTax = 0.00;
      this.tax = 0.00;
      for(const lineItem of this.lineItems){
          this.amount = this.amount + parseFloat(lineItem.amount);
          this.amountWithTax = this.amountWithTax + parseFloat(lineItem.amountWithTax);
          this.tax = this.tax + parseFloat(lineItem.tax);
      }
   }
   static count = 2200;
}

class StoreManagement{ 
   static invoices = [];
   static invoiceId = '';
   static totalAmount = 0.00;
   static totalAmountWithTax = 0.00;
   static totalTax = 0.00;
   static count = 0;

   static createInvoice(invoice){
       this.invoices.push(invoice);
       this.invoiceId = invoice.invoiceId;
       this.totalAmountWithTax += parseFloat(invoice.amountWithTax);
       this.totalAmount += parseFloat(invoice.amount);
       this.totalTax += parseFloat(invoice.tax);
       this.count++;
   }
}

Vue.component('line-items-table',{
 props: ['items'],  
 template:`
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
           <td><i class="fas fa-trash" @click="removeItem(lineItem)"></i></td>
       </tr>
   </tbody>
</table>`,
   methods:{
       removeItem(lineItem){
           this.items = this.items.filter(function(el){
            // return el !=lineItem;
            this.items.splice(this.items.indexOf(lineItem),1);
            this.amount = this.amount - (lineItem.amountWithTax);
        });
       }
   }    
});
  



Vue.component('input-form',{
   props: ['items','amount','home','input'],
   
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

   data(){
       return {
           productName: null,
           quantity: null,
           mrp: null,
           errors: [],
           invoiceAmount: this.amount,
           invoicePage: this.home,
           inputPage: this.input,
       };
   },

   methods:{
       onSubmit(){
           if(this.productName && this.quantity && this.mrp){
               const lineItem = new LineItem(this.productName,this.quantity, this.mrp);
               this.items.push(lineItem);
               this.invoiceAmount = this.invoiceAmount + parseFloat(lineItem.amountWithTax);
               this.inputPage = false;
               this.invoicePage = true;
               this.productName = this.mrp = this.quantity = null;
           }
   
           else {
               if(!this.productName) this.errors.push("Product Name required.");
               if(!this.quantity) this.errors.push("Quantity required.");
               if(!this.mrp) this.errors.push("MRP required.");
           }
       },
   },
});

Vue.component('sales-page',{
   template:`
   <div>
       <h1>Total Sales</h1>
       <h2>Total number of invoices:{{ invoicesCount }}</h2> 
       <h2>Total Sales:{{ sales }}</h2>
       <h2>Total Tax: {{ tax }}</h2>
       <h2>Total Revenue:{{ revenue }}</h2>
   </div>`,
   data(){
       return{
           invoicesCount: StoreManagement.count,
           sales: StoreManagement.totalAmountWithTax,
           tax: StoreManagement.totalTax,
           revenue: StoreManagement.totalAmount,
       };
   }
 });

 Vue.component('invoices-page',{
   props: ['amount'],
   template:`
   <table class="invoice-listing">
       <thead>
           <tr>
               <th>SlNo.</th>
               <th>Invoice ID</th>
               <th>Total Amount</th>                  
           </tr>
       </thead>

       <tbody class="invoices" id="invoice-list">
           <td>{{ this.invoicesCount }}</td>
           <td>{{ this.invoiceId }}</td>
           <td>{{ amount }}</td>
       </tbody>
       </tbody>
   </table>`,

   data(){
       return{
           invoicesCount: StoreManagement.count,
           invoiceId: StoreManagement.invoiceId,
           // invoiceAmount: this.invoiceAmount.toFixed(2),
       };
   }
 });

var store = new Vue({
   el:'#container',
   data:{
       items: [],
       invoices: StoreManagement.invoices,
       amount: 0,
       home: true,
       viewTotalSales: false,
       viewAllInvoices: false,
       input: false,
       isInvoiceCompleted: false,
   },
       
   methods:{
       // submit(){
       //     if(this.productName && this.quantity && this.mrp){
       //         const lineItem = new LineItem(this.productName,this.quantity, this.mrp);
       //         this.items.push(lineItem);
       //         this.invoiceAmount = this.invoiceAmount + parseFloat(lineItem.amountWithTax);
       //         this.inputPage = false;
       //         this.invoicePage = true;
       //     }
   
       //     else {
       //         if(!this.productName) this.errors.push("Product Name required.");
       //         if(!this.quantity) this.errors.push("Quantity required.");
       //         if(!this.mrp) this.errors.push("MRP required.");
       //     }
       // },

       // submit(){
       //     home=true;
       //     input=false;
       // },
       submitInvoice(){
           if(this.items.length === 0){
               alert('Invoice is empty!!! Add an item.');
           }
           else{
               const invoice = new Invoice(this.items);
               StoreManagement.createInvoice(invoice);
               this.items = [];
               this.amount = 0;
           }
       },
   
       // displayInvoices(){
           
       // },
   }, 
})
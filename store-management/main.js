"use strict";

class LineItem{
     constructor(productName, quantity, mrp){
        this.itemId = "LI22N" + ++LineItem.count;
        this.productName = productName;
        this.quantity = quantity;
        this.mrp = mrp;
        this.amount = (quantity * mrp).toFixed(2);
        this.tax = (this.amount * 0.18).toFixed(2);
        this.amountWithTax = (this.amount * 1.18).toFixed(2);
     }  
     static count = 200;
}

class Invoice{
   constructor(lineItems){
       this.invoiceId = "INV22X"+ ++Invoice.count;
       this.lineItems = lineItems;
       this.amount = 0.00;
       this.amountWithTax = 0.00;
       this.tax = 0.00;
       for(const lineItem of this.lineItems){
           this.amount += parseFloat(lineItem.amount);
           this.amountWithTax += parseFloat(lineItem.amountWithTax);
           this.tax += parseFloat(lineItem.tax);
       }
    }
    static count =2200;
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
        console.log(this.invoices);
    }
}

// UI
class UI{
    static lineItems = [];
    static invoiceAmount = 0.00;

    static displayLineItems(){      
        for(const lineItem in this.lineItems){
            return UI.addItemToList(lineItem);
        }
    }


    static addItemToList(lineItem){
        // adds item to lineItem[] 
        this.lineItems.push(lineItem);
        this.invoiceAmount += parseFloat(lineItem.amountWithTax);
        console.log(this.lineItems);

        // adds item to UI
        const list = document.querySelector('#lineItems-list');
        const row= document.createElement('tr');

        row.innerHTML =`
        <td>${lineItem.itemId}</td>
        <td>${lineItem.productName}</td>
        <td>${lineItem.quantity}</td>
        <td>${lineItem.mrp}</td>
        <td>${lineItem.amount}</td>
        <td>${lineItem.tax}</td>
        <td>${lineItem.amountWithTax}</td>
        <td><i class="fas fa-trash"></i></td>
        `;

        list.appendChild(row);
    }

    static deleteItem(el){
        // deletes item from UI
        if(el.classList.contains('fa-trash')){
            el.parentElement.parentElement.remove();
        }
        // deletes item from lineItems[]
        const itemId = el.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        this.lineItems.forEach((lineItem)=>{
             if(lineItem.itemId === itemId){
                this.lineItems.splice(this.lineItems.indexOf(lineItem),1);
                console.log("delete", this.lineItems);
                this.invoiceAmount -= parseFloat(lineItem.amountWithTax);
                this.amount -= parseFloat(lineItem.amount);
                this.amountWithTax -= parseFloat(lineItem.amountWithTax); 
                this.tax -= parseFloat(lineItem.tax);
            }
        });
        
    }

    static clearInvoice(){
        const list = document.querySelector('#lineItems-list');
        const row= document.createElement('tr');
        list.innerHTML ="";
        row.innerHTML ="";
        document.querySelector('#viewTotal').innerHTML=`Total Amount: ${0.00}`;
    }

    static clearFields(){
        document.querySelector('#productName').value='';
        document.querySelector('#quantity').value='';
        document.querySelector('#mrp').value='';
    }

    static displayInvoices(){
        const invoiceList =document.querySelector('#invoice-list');
        const row= document.createElement('tr');

        row.innerHTML =`
        <td>${StoreManagement.count}</td>
        <td>${StoreManagement.invoiceId}</td>
        <td>${this.invoiceAmount.toFixed(2)}</td>
        `;

        invoiceList.appendChild(row);
    }
}


// Shows total amount inside the container
document.querySelector('#viewTotal').innerHTML=`Total Amount: 
${UI.invoiceAmount.toFixed(2)}`;

// Event: Creates new invoice
document.querySelector("#newInvoice").addEventListener("click",showInvoice);
function showInvoice(){
    document.querySelector("#invoiceDiv").style.display="flex";
    document.querySelector("#totalSales").style.display = "none";
    document.querySelector("#allInvoices").style.display = "none";
    document.querySelector("#inputForm").style.display = "none";
    document.querySelector("#popupDiv").style.display = "none";
}

// Event: Display lineItem
document.addEventListener('DOMContentLoaded',UI.displayLineItems);


// Event: Add lineItem button
document.querySelector("#addItem").addEventListener("click",addItemFunction);
function addItemFunction(){
    document.querySelector("#invoiceDiv").style.display="none";
    document.querySelector("#inputForm").style.display = "flex";
    document.querySelector("#allInvoices").style.display = "none";
    document.querySelector("#totalSales").style.display = "none";
    document.querySelector("#popupDiv").style.display = "none";
}

// Event: Insert lineItem
document.querySelector("#inputForm").addEventListener("submit",
    (e)=>{
        e.preventDefault();
        const productName = document.querySelector('#productName').value;
        const quantity = document.querySelector('#quantity').value;
        const mrp = document.querySelector('#mrp').value;

        if(productName === '' || quantity === '' || mrp === ''){
            alert("Please fill all fields...");
        }
        else{
            const lineItem = new LineItem(productName,quantity,mrp);
            UI.addItemToList(lineItem);
            // UI.lineItems.push(lineItem);
            alert('Item Added');
            UI.clearFields();
            document.querySelector('#viewTotal').innerHTML=`Total Amount: 
            ${UI.invoiceAmount.toFixed(2)}`;
            this.showInvoice();
        }
    }
);

// Event: Delete an item
document.querySelector('#lineItems-list').addEventListener('click', 
    (e)=>{
        UI.deleteItem(e.target);
        if(e.target.classList.contains('fa-trash')){
        // Shows total amount inside the container
        document.querySelector('#viewTotal').innerHTML=`Total Amount: ${UI.invoiceAmount.toFixed(2)}`;
        
        alert('Item Removed');
        }
    }
);

// Event: Submit invoice
document.querySelector("#checkout").addEventListener("click",submitInvoice);
function submitInvoice(){
    if(UI.lineItems.length === 0){
        alert('Invoice is empty!!! Add an item.')
    }
    else{
        document.querySelector("#invoiceDiv").style.display="none";
        document.querySelector("#popupDiv").style.display = "flex";
        document.querySelector("#allInvoices").style.display = "none";
        document.querySelector("#totalSales").style.display = "none";
        document.querySelector("#inputForm").style.display = "none";

        // Add invoice to array
        const invoice = new Invoice(UI.lineItems)  
        StoreManagement.createInvoice(invoice);

        // Shows popup container
        const displayPopup = document.querySelector('.popup-container');
        displayPopup.innerHTML = `<h2>Your total is $${UI.invoiceAmount.toFixed(2)}.</h2>
        <h2>Thanks for shopping.</h2>`;
        // <input type="submit" value="Done" class="button">`; 

        UI.clearInvoice();
        UI.lineItems = [];
        
        // Show invoices in UI
        UI.displayInvoices();  

        UI.invoiceAmount = 0.00;
    }
}

// Event: View total sales button
document.querySelector("#viewSales").addEventListener("click",showTotalSales);
function showTotalSales(){
    document.querySelector("#invoiceDiv").style.display="none";
    document.querySelector("#allInvoices").style.display = "none";
    document.querySelector("#totalSales").style.display = "flex";
    document.querySelector("#inputForm").style.display = "none";
    document.querySelector("#popupDiv").style.display = "none"; 

    // View total sales
    const displayTotalSales = document.querySelector('#totalSales');
    displayTotalSales.innerHTML = `<h1>Total Sales</h1>
    <h2>Total number of invoices: ${StoreManagement.invoices.length}</h2> 
    <h2>Total Sales: ${StoreManagement.totalAmountWithTax.toFixed(2)}</h2>
    <h2>Total Tax: ${StoreManagement.totalTax.toFixed(2)}</h2>
    <h2>Total Revenue: ${StoreManagement.totalAmount.toFixed(2)}</h2>`;
}

// Event: View all invoices button
document.querySelector("#viewInvoices").addEventListener("click",showAllInvoices);
function showAllInvoices(){
    document.querySelector("#invoiceDiv").style.display="none";
    document.querySelector("#totalSales").style.display = "none";
    document.querySelector("#allInvoices").style.display = "flex";
    document.querySelector("#inputForm").style.display = "none";
    document.querySelector("#popupDiv").style.display = "none";
}
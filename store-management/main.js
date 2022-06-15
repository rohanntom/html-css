"use strict";

class LineItem{
     constructor(productName, quantity, mrp){
        this.productName = productName;
        this.quantity = quantity;
        this.mrp = mrp;
        this.amount = (quantity * mrp).toFixed(2);
        this.tax = (this.amount * 0.18).toFixed(2);
        this.amountWithTax = (this.amount * 1.18).toFixed(2);
     }
}

class Invoice{
    static lineItems = [];
    static amount = 0;
    static amountWithTax = 0;
    static tax = 0;

    static addItem(productName,quantity,mrp){
        let lineItem = new LineItem(productName,quantity,mrp);
       
        this.lineItems.push(lineItem);
        this.amount += parseFloat(lineItem.amount);
        this.amountWithTax += parseFloat(lineItem.amountWithTax); 
        this.tax += parseFloat(lineItem.tax);
       
    }
    static removeItem(productName){
        // console.log(productName);
        // const pathOfItem = Object.keys(this.lineItems);
        // const deleteItem = this.lineItems.indexOf(productName);
        // if(deleteItem > -1){
        //     this.lineItems.splice(deleteItem, 1);
        //     // this.amount -= parseFloat(lineItem.amount);
        //     // this.amountWithTax -= parseFloat(lineItem.amountWithTax); 
        //     // this.tax -= parseFloat(lineItem.tax);
        // }
        // console.log(this.lineItems);
       
        console.log(productName);
        this.lineItems.forEach((lineItem) => {
            if(lineItem.productName === productName){
                // this.lineItems.splice(lineItem, 1);
                this.lineItems.pop(lineItem);
                this.amount -= parseFloat(lineItem.amount);
                this.amountWithTax -= parseFloat(lineItem.amountWithTax); 
                this.tax -= parseFloat(lineItem.tax);
            }
            console.log(this.lineItems);
        });
    }
}

class StoreManagement{ 
    static invoices = [];
    static invoiceId = '';
    static totalAmount = 0;
    static totalAmountWithTax = 0;
    static totalTax = 0;
    static count = 0;

    static createInvoice(){
        let invoice = Invoice.lineItems;
        this.invoices.push(invoice);
        this.invoiceId = Date.now();
        this.totalAmountWithTax += parseFloat(Invoice.amountWithTax);
        this.totalAmount += parseFloat(Invoice.amount);
        this.totalTax += parseFloat(Invoice.tax);
        this.count++;
        console.log(this.invoices);
    }

    // static calcSales(){
    //     this.invoices.forEach((invoice) =>{
    //      invoice.

    //     } );

    // }

}

//UI
class UI{
    static displayLineItems(){
        let lineItems = Invoice.lineItems;  
        // if(lineItems.length === 0){
        //     document.querySelector(".lineItem-listing").style.display = "none";
        //     document.querySelector("#emptyLineItem").style.display = "flex";
        //     document.querySelector("#invoiceDiv").style.display="flex";
        //     document.querySelector("#totalSales").style.display = "none";
        //     document.querySelector("#allInvoices").style.display = "none";
        //     document.querySelector("#inputForm").style.display = "none";
        //     document.querySelector("#popupDiv").style.display = "none";
        // }
        // else{
        //     document.querySelector("#invoiceDiv").style.display="flex";
        //     document.querySelector("#totalSales").style.display = "none";
        //     document.querySelector("#allInvoices").style.display = "none";
        //     document.querySelector("#inputForm").style.display = "none";
        //     document.querySelector("#popupDiv").style.display = "none";
        //     document.querySelector(".lineItem-listing").style.display = "flex";
        //     document.querySelector("#emptyLineItem").style.display = "none";
        // }
        
            for(let lineItem in lineItems){
                return UI.addItemToList(lineItem);
            }
    }


    static addItemToList(lineItem){
        const list = document.querySelector('#lineItems-list');
        const row= document.createElement('tr');

        // <td>${Invoice.count}</td>
        row.innerHTML =`
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
        if(el.classList.contains('fa-trash')){
            el.parentElement.parentElement.remove();
        }
    }
    static clearLineItems(){
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
        let invoiceList =document.querySelector('#invoice-list');
        let row= document.createElement('tr');

        row.innerHTML =`
        <td>${StoreManagement.count}</td>
        <td>${StoreManagement.invoiceId}</td>
        <td>${Invoice.amountWithTax.toFixed(2)}</td>
        `;

        invoiceList.appendChild(row);
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className =`alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form =document.querySelector('#inputForm');
        container.insertBefore(div, form);
        setTimeout(()=>document.querySelector('.alert').remove() ,2000);
    }
    
}


// Shows total amount inside the container
document.querySelector('#viewTotal').innerHTML=`Total Amount: ${Invoice.amountWithTax.toFixed(2)}`;

// Event: Create new invoice
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
    let productName = document.querySelector('#productName').value;
    let quantity = document.querySelector('#quantity').value;
    let mrp = document.querySelector('#mrp').value;

    if(productName === '' || quantity === '' || mrp === ''){
        // UI.showAlert("Please fill all fields", "danger");
        alert("Please fill all fields");
    }
    else{
        let lineItem = new LineItem(productName,quantity,mrp);
        UI.addItemToList(lineItem);
        Invoice.addItem(productName,quantity,mrp);
        //UI.showAlert("Item Added", 'success');
        alert('Item Added');
        UI.clearFields();
        document.querySelector('#viewTotal').innerHTML=`Total Amount: ${Invoice.amountWithTax.toFixed(2)}`;
        this.showInvoice();
    }
}
);

// Event: Delete an item
document.querySelector('#lineItems-list').addEventListener('click',(e)=>{
   UI.deleteItem(e.target);
   if(e.target.classList.contains('fa-trash')){

    // delete lineItem from array
    Invoice.removeItem(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
    // Shows total amount inside the container
    document.querySelector('#viewTotal').innerHTML=`Total Amount: ${Invoice.amountWithTax.toFixed(2)}`;
    // UI.showAlert('Item removed','danger');
    alert('Item Removed');
   }
})

// Event: Submit invoice
document.querySelector("#checkout").addEventListener("click",submitInvoice);

    function submitInvoice(){
        if(Invoice.lineItems.length === 0){
            alert('Invoice is empty!!! Add an item.')
        }
        else{
    document.querySelector("#invoiceDiv").style.display="none";
    document.querySelector("#popupDiv").style.display = "flex";
    document.querySelector("#allInvoices").style.display = "none";
    document.querySelector("#totalSales").style.display = "none";
    document.querySelector("#inputForm").style.display = "none";
    // console.log(StoreManagement.invoices);

    // Add invoice to array  
    StoreManagement.createInvoice();

    // Shows popup container
    const displayPopup = document.querySelector('.popup-container');
    displayPopup.innerHTML = `<h2>Your total is $${Invoice.amountWithTax.toFixed(2)}.</h2>
    <h2>Thanks for shopping.</h2>`;
    // <input type="submit" value="Done" class="button">`; 
    UI.clearLineItems();
    Invoice.lineItems = [];
    // Show invoices in UI
    UI.displayInvoices();  
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

    // // Show all invoices
    // document.addEventListener('DOMContentLoaded',UI.displayInvoices);
}


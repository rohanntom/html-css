"use strict";

class LineItem{
     constructor(productName, quantity, mrp){
        this.productName = productName;
        this.quantity = quantity;
        this.mrp = mrp;
    }
    get amount(){
        return (this.quantity * this.mrp).toFixed(2);
    }
    get tax(){
        return (this.amount * 0.18).toFixed(2);
    }
    get amountWithTax(){
        return (this.amount * 1.18).toFixed(2);
    }
}

class Invoice{
     static getLineItems(){
        let lineItems;
        // console.log(lineItems);

        // if(localStorage.getItem('lineItems') === null){
        //     lineItems = [];
        // }else{
        //     lineItems = JSON.parse(localStorage.getItem('lineItems'));
        // }

        if(lineItems === undefined){
            lineItems = [];
        }
 
        return lineItems;
    } 

    static addItem(productName,quantity,mrp){
        let lineItem = new LineItem(productName,quantity,mrp);
        let lineItems = this.getLineItems();
        lineItems.push(lineItem);
        console.log(lineItems);
        // console.log(Invoice.calcTotalAmount());
        // localStorage.setItem('lineItems',JSON.stringify(lineItems));
    }
    static removeItem(productName){
        let lineItems = Invoice.getLineItems();
        lineItems.forEach((lineItem,index) => {
            if(lineItem.productName === productName){
                lineItems.splice(index,1);
            }
        });
        // console.log(lineItems);
        //localStorage.setItem('lineItems', JSON.stringify(lineItems));
    }

   static calcTotalAmount(){
        let totalAmount = 0;
        let lineItems = Invoice.getLineItems();
        // console.log(lineItems);
        // lineItems.forEach((lineItem) => totalAmount = totalAmount + lineItem.amount);
        for(let lineItem in lineItems){
            totalAmount = totalAmount + lineItem.amount;
        }
        return totalAmount;
   }

   static calcTotalAmountWithTax(){
        let totalAmountWithTax = 0;
        let lineItems = Invoice.getLineItems();
        // console.log(lineItems);
        for(let lineItem in lineItems){
            totalAmountWithTax = totalAmountWithTax + lineItem.amountWithTax;
        }
        // console.log(totalAmountWithTax);
        return totalAmountWithTax;
   }
}

class StoreManagement{ 
    static getInvoices(){
        var invoices;
        // if(localStorage.getItem('invoices') === null){
        //     invoices=[];
        // } else{
        //     invoices = JSON.parse(localStorage.getItem('invoices'));
        // }
        if(invoices === undefined){
            invoices=[];
        }
        return invoices;
    }

    // get invoiceId(){
    //     return Date.now();
    // }

    static createInvoice(){
        let invoice = Invoice.getLineItems();
        let invoices = StoreManagement.getInvoices()
        invoices.push(invoice);
        // console.log(invoices);
      //  localStorage.setItem('invoices',JSON.stringify(invoices));
    }

}

//UI
class UI{
    static displayLineItems(){
        let lineItems = Invoice.getLineItems();
        // console.log(lineItems);
        // if(this.lineItems === undefined){
        //     document.querySelector(".lineItem-listing").style.display = "none";
        //     document.querySelector("#emptyLineItem").style.display = "flex";
        // }
        // else {
        //     document.querySelector(".lineItem-listing").style.display = "flex";
        //     document.querySelector("#emptyLineItem").style.display = "none";
        // }

        
        
            for(let lineItem in lineItems){
                return UI.addItemToList(lineItem);
            }
     //   lineItems.forEach((lineItem) => UI.addItemToList(lineItem)); 
    }


    static addItemToList(lineItem){
        const list = document.querySelector('#lineItems-list');

        const row= document.createElement('tr');

        

        // <td>${UI.serialNumber+1}</td>
        row.innerHTML =`
        <td>${lineItem.productName}</td>
        <td>${lineItem.quantity}</td>
        <td>${lineItem.mrp}</td>
        <td>${lineItem.amount}</td>
        <td>${lineItem.tax}</td>
        <td>${lineItem.amountWithTax}</td>
        <td><i class="fas fa-trash"></i></td>
        `;
       // <td><i class="fas fa-pen"></i></td>

        list.appendChild(row);
    }

    static deleteItem(el){
        if(el.classList.contains('fa-trash')){
            el.parentElement.parentElement.remove();
        }
    }

    static clearFields(){
        document.querySelector('#productName').value='';
        document.querySelector('#quantity').value='';
        document.querySelector('#mrp').value='';
    }
    
    static displayInvoices(){
     const invoices = StoreManagement.getInvoices();
     invoices.forEach((invoice)=>UI.addInvoice(invoice));
    }

    static addInvoice(invoice){
    const invoiceList =document.querySelector('#invoice-list');

    const row= document.createElement('tr');

    row.innerHTML =`
    <td>${Date.now()}</td>
    <td>${invoice.calcTotalAmountWithTax}</td>
    `;
    // <td>${invoice.slNo}</td>
    // <td><i class="fas fa-trash"></i></td>
    // <td><i class="fas fa-pen"></i></td>

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
document.querySelector('#viewTotal').innerHTML=`Total Amount: ${Invoice.calcTotalAmountWithTax()}`;

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
    const productName = document.querySelector('#productName').value;
    const quantity = document.querySelector('#quantity').value;
    const mrp = document.querySelector('#mrp').value;

    if(productName === '' || quantity === '' || mrp === ''){
        // UI.showAlert("Please fill all fields", "danger");
        alert("Please fill all fields");
    }
    else{
        const lineItem = new LineItem(productName,quantity,mrp);
        UI.addItemToList(lineItem);
        Invoice.addItem(productName,quantity,mrp);
        // StorageEvent.addLineItem(lineItem);

        //UI.showAlert("Item Added", 'success');
        alert('Item Added');
        UI.clearFields();
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
    
    // UI.showAlert('Item removed','danger');
    alert('Item Removed');
   }
})

// Event: Submit invoice
document.querySelector("#invoiceCompleted").addEventListener("click",submitInvoice);
function submitInvoice(){
    document.querySelector("#invoiceDiv").style.display="none";
    document.querySelector("#popupDiv").style.display = "flex";
    document.querySelector("#allInvoices").style.display = "none";
    document.querySelector("#totalSales").style.display = "none";
    document.querySelector("#inputForm").style.display = "none";

    // Show invoices in UI
    UI.displayInvoices();  
    // Add invoice to array  
    StoreManagement.createInvoice();
}



// Shows popup container
const displayPopup = document.querySelector('.popup-container');
displayPopup.innerHTML = `<h2>Your total is $${Invoice.calcTotalAmountWithTax()}.</h2>
<h2>Thanks for shopping.</h2>`;
/* <input type="submit" value="Done" class="button">`; */


// Event: View total sales button
document.querySelector("#viewSales").addEventListener("click",showTotalSales);
function showTotalSales(){
    document.querySelector("#invoiceDiv").style.display="none";
    document.querySelector("#allInvoices").style.display = "none";
    document.querySelector("#totalSales").style.display = "flex";
    document.querySelector("#inputForm").style.display = "none";
    document.querySelector("#popupDiv").style.display = "none"; 
}



// View total sales
const displayTotalSales = document.querySelector('#totalSales');

displayTotalSales.innerHTML = `<h1>Total Sales</h1>
<h2>Total Sales: ${Invoice.calcTotalAmountWithTax()}</h2>
<h2>Total Tax: ${Invoice.calcTotalAmount()}</h2>
<h2>Total Revenue: ${Invoice.calcTotalAmountWithTax() - Invoice.calcTotalAmount()}</h2>`;
// <h2>Total number of invoices: ${Invoice.getLineItems().length}</h2> 
// Event: Display invoices
// var uniqueId = Date.now();
// document.addEventListener('DOMContentLoaded',UI.displayInvoices);

// Event: View all invoices button
document.querySelector("#viewInvoices").addEventListener("click",showAllInvoices);
function showAllInvoices(){
    document.querySelector("#invoiceDiv").style.display="none";
    document.querySelector("#totalSales").style.display = "none";
    document.querySelector("#allInvoices").style.display = "flex";
    document.querySelector("#inputForm").style.display = "none";
    document.querySelector("#popupDiv").style.display = "none";
}

// Show all invoices
document.addEventListener('DOMContentLoaded',UI.displayInvoices);
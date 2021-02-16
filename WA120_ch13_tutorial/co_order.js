"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Tutorial Case

   Order Form Script
   
   Author: Angel_Cordero
   Date: 02.03.2021  
   
   Filename: co_order.js
   
   Function List
   =============
   
   calcOrder()
      Calculates the cost of the customer order
      
   formatNumber(val, decimals)
      Format a numeric value, val, using the local
      numeric format to the number of decimal
      places specified by decimals
      
   formatUSACurrency(val)
      Formats val as U.S.A. currency
   
*/
// Event listener which handles the load of the document
window.addEventListener("load", function() {
   // variable that creates a shortcut reference to the order form
   var orderForm = document.forms.orderForm;
   // adjust value of the order field to the current date
   orderForm.elements.orderDate.value = new Date().toDateString();
   // add the focus to the model field on the form when page loads
   orderForm.elements.model.focus();

   // call to the calcOrder() function which will calculate the order
   // definition of the calcOrder() function
   calcOrder();

   // event handlers for the web form
   orderForm.elements.model.onchange = calcOrder;
   orderForm.elements.qty.onchange = calcOrder;

   var planOptions = document.querySelectorAll('input[name="protection"]');
   // loop through the planOptions array and add an event handler to each element
   for (var i = 0; i < planOptions.length; i++) {
      planOptions[i].onclick = calcOrder;
   }
});

// definition of the calcOrder() function. All run with the page loads
function calcOrder() {
   //re-establish a variable that creates the shortcut to the order form
   var orderForm = document.forms.orderForm;
  
   // calculate the initial cost of the order
   var mIndex = orderForm.elements.model.selectedIndex;
   var mCost = orderForm.elements.model.options[mIndex].value;
   var qIndex = orderForm.elements.qty.selectedIndex;
   var quantity = orderForm.elements.qty.options[qIndex].value;

   // initial cost = model cost x quantity
   var initialCost = mCost * quantity;
   // change the field value on the form to reflect initial cost
   orderForm.elements.initialCost.value = formatUSCurrency(initialCost);

   // retrieve the cost of the user's protection plan
   var pCost = document.querySelector('input[name="protection"]:checked').value * quantity;
   // change the field value on the form to reflect the protection plan cost
   orderForm.elements.protectionCost.value = formatNumber(pCost, 2);

   // calculate the order subtotal and change the field value
   orderForm.elements.subtotal.value = formatNumber(initialCost + pCost, 2);

   // Calculate the sales tax
   var salesTax = 0.05 * (initialCost + pCost);
   // change the field vaue on the form to reflect the sales tax
   orderForm.elements.salesTax.value = formatNumber(salesTax, 2);

   // Calculate the cost of the TOTAL order
   var totalCost = initialCost + pCost + salesTax;
   // change the field value on the form to reflect the TOTAL order
   orderForm.elements.totalCost.value = formatUSCurrency(totalCost);

   // store the order details in hidden fields of the form
   orderForm.elements.modelName.value =
      orderForm.elements.model.options[mIndex].text;
   orderForm.elements.protectionName.value =
      document.querySelector('input[name="protection"]:checked').nextSibling.nodeValue;
}

// definition of the formatNumber() funciton
function formatNumber(val, decimals) {
   return val.toLocaleString(undefined,
      {minimumFractionDigits: decimals,
      maximumFractionDigits: decimals});
}

// definition of the formatUSACurrency
function formatUSCurrency(val) {
   return val.toLocaleString('en-US',
   {style: "currency", currency: "USD"})
}

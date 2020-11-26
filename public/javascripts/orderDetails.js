import {deliveryFee, Calculator} from './priceCalculator.js';

$(function ready() {

    $.getJSON("/api/order", function (data) {
        
        var newOrder = data[data.length - 1];
        let pizzaCalculator = new Calculator(newOrder.size, newOrder.topping, newOrder.quantity);
        pizzaCalculator.toppingsTotalPrice();

        $("#pizzaSize").append("Size: " + newOrder.size);
        $("#pizzaCrust").append("Crust: " + newOrder.crust);

        for(var i=0; i<newOrder.topping.length; i++){
            $("#pizzaTopping").append(newOrder.topping[i] + ' ');
        }

        for(var i=0; i<newOrder.sauce.length; i++){
            $("#pizzaSauce").append(newOrder.sauce[i] + ' ');
        }
        
        $("#pizzaQuantity").append("Quantity: " + newOrder.quantity);
        $("#pizzaPrice").append("Pizza Price: "+ pizzaCalculator.pizzaSubPrice());
        $("#delivery-fee").append("Delivery Fee: "+deliveryFee);
        $("#tax").append("Tax: "+ pizzaCalculator.taxPrice());
        $("#totalPrice").append("Total Price: "+pizzaCalculator.totalFinalPrice());
    });
});
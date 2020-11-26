const sizePrice = {small: 5.99, medium: 7.99, large: 9.99};

const toppingPrice = {pepperoni: 1.29, sausage: 1.29,
                        beef: 1.56, chicken: 1.2,
                        bacon: 1.29, salami: 1.35,
                        steak: 2.12, ham: 1.37};

const taxRate = 0.12;

let topPrice = 0.0;

export const deliveryFee = 3.99;

export class Calculator {

    constructor(size, topping, quantity){
        this.size = size;
        this.topping = topping;
        this.quantity = quantity;
    }

    roundUp(amount) {
        return Math.round(amount * 100)/100;
    }

    toppingsTotalPrice(){
        this.topping.forEach(each => {
            topPrice += toppingPrice[each];
        });
        console.log("final top price: ", topPrice);
    }

    pizzaSubPrice(){
        let result = this.roundUp((topPrice+sizePrice[this.size])*this.quantity);
        topPrice = 0;
        return result;
    }

    taxPrice(){
        this.toppingsTotalPrice();
        return this.roundUp((this.pizzaSubPrice() + deliveryFee) * taxRate);
    }

    totalFinalPrice(){
        this.toppingsTotalPrice();
        return this.roundUp(this.pizzaSubPrice() + deliveryFee + this.taxPrice());
    }
}
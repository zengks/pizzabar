import { Calculator } from './priceCalculator';

//test 1
test('Round Up Positive Test', () => {
    let size = "medium";
    let topping = ["beef", "salami", "steak"];
    let quantity = 1;
    const calTest = new Calculator(size, topping, quantity);
    expect(
        calTest.roundUp(1.34567)
    ).toBe(1.35)
})

//test 2
test('Round Up Negative Test', () => {
    let size = "medium";
    let topping = ["beef", "salami", "steak"];
    let quantity = 1;
    const calTest = new Calculator(size, topping, quantity);
    expect(
        calTest.roundUp(-1.34567)
    ).toBe(-1.35)
})

//test 3
test('Pizza Sub Price Positive Test', () => {
    let size = "medium";
    let topping = ["beef", "salami", "steak"];
    let quantity = 1;
    const calTest = new Calculator(size, topping, quantity);
    calTest.toppingsTotalPrice();
    expect(
        calTest.pizzaSubPrice()
    ).toBe(13.02)
})

//test 4
test('Pizza Sub Price Negative Test', () => {
    let size = "medium";
    let topping = ["beef", "salami", "steak"];
    let quantity = -1;
    const calTest = new Calculator(size, topping, quantity);
    calTest.toppingsTotalPrice();
    expect(
        calTest.pizzaSubPrice()
    ).toBe(-13.02);
})

//test 5
test('Tax Price Positive Test', () => {
    let size = "large";
    let topping = ["chicken", "bacon"];
    let quantity = 2;
    const calTest = new Calculator(size, topping, quantity);
    expect(
        calTest.taxPrice()
    ).toBe(3.47)
})

//test 6
test('Tax Price Negative Test', () => {
    let size = "large";
    let topping = ["chicken", "bacon"];
    let quantity = -2;
    const calTest = new Calculator(size, topping, quantity);
    expect(
        calTest.taxPrice()
    ).toBe(-2.52)
})

//test 7
test('Total Final Price Positive Test', () => {
    let size = "small";
    let topping = ["steak", "beef", "salami", "sausage"];
    let quantity = 1;
    const calTest = new Calculator(size, topping, quantity);
    expect(
        calTest.totalFinalPrice()
    ).toBe(18.26)
})

//test 8
test('Total Final Price Negative Test', () => {
    let size = "small";
    let topping = ["steak", "beef", "salami", "sausage"];
    let quantity = -1;
    const calTest = new Calculator(size, topping, quantity);
    expect(
        calTest.totalFinalPrice()
    ).toBe(-9.32)
})

//test 9
test('Pizza Sub Price Zero Test', () => {
    let size = "medium";
    let topping = ["beef", "salami", "steak"];
    let quantity = 0;
    const calTest = new Calculator(size, topping, quantity);
    calTest.toppingsTotalPrice();
    expect(
        calTest.pizzaSubPrice()
    ).toBe(0)
})

//test 10
test('Tax Price Zero Test', () => {
    let size = "large";
    let topping = ["chicken", "bacon"];
    let quantity = 0;
    const calTest = new Calculator(size, topping, quantity);
    expect(
        calTest.taxPrice()
    ).toBe(0.48)
})

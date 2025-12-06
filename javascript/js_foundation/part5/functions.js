/*
1. Write a function named `makeTea` that takes one parameter, `typeOfTea` and returns a string like `"Making green tea"` when called with `"green tea"`. Store the result in a variable named `teaOrder`.
*/
function makeTea(typeOfTea) {
    return `Making ${typeOfTea}`;
}

const teaOrder = makeTea("Masala Chai");
// console.log(teaOrder);

/*
2. Create a function named `orderTea` that takes one parameter, `teaType`. Inside the function create another function `confirmOrder` that returns a message like `"Order confirmed for chai"`. Call `confirmOrder` from within `orderTea` and return the result.
*/
function orderTea(teaType) {
    function confirmOrder(tea) {
        return `Order confirmed for ${tea}`;
    }
    return confirmOrder(teaType);
}

// console.log(orderTea("Black Tea"))

/*
3. Write an arrow function named `calculateTotal` that takes two parameters: `price` and `quantity`. the function should return the total cost my multiplying the `price` and `quanntity`. Store the result in a variable named `totalCost`.
*/
const calculateTotal = (price, quantity) => {
    return price * quantity;
};

// const calculateTotal = (price, quantity) => price * quantity;

const totalCost = calculateTotal(50, 50);
// console.log(totalCost);

/*
4. Write a function named `processTeaOrder` that takes another function `makeTea`, as a parameter and calls it with an argument `"earl gray"`. Return the argument of calling `makeTea`.
*/

function processTeaOrder(teaFunc) {
    return teaFunc("earl gray");
}
const orderStatus = processTeaOrder(makeTea);
// console.log(orderStatus);

/*
5. Write a function named `createTeaMaker` that returns another function. The reutrned function should take one parameter, `teaType`, and return a message like `"Making green tea"`. Store the returned value in a variable named `teaMaker` and call it with `"green tea"`.
*/

// function teaMsg(tea) {
//     return `Making ${tea}`;
// }
// function createTeaMaker(teaMaker) {
//     return teaMaker("green tea");
// }
// const teaMaker = createTeaMaker(teaMsg);
// console.log(teaMaker);

function createTeaMaker(name) {
    return function (teaType) {
        return `Making ${teaType} for you ${name}`;
    };
}

const teaMaker = createTeaMaker("Akash");
const result = teaMaker("green Tea")
console.log(result);

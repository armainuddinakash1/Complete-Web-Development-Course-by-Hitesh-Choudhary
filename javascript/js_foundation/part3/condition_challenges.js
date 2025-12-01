// Check if a number is greater than another number

let num1 = 3;
let num2 = 5;


if (num1 > num2) {
    // console.log(`${num1} is greater than ${num2}`);
} else {
    // console.log(`${num1} is not greater than ${num2}`);
}



// Check if a string is equal to another string

let str1 = "hello";
let str2 = "world";
if (str1 !== str2) {
    // console.log(`"${str1}" is equal to "${str2}"`);
} else {
    // console.log(`"${str1}" is not equal to "${str2}"`);
}


// Checking if a variable is number or not

let value = "38";
if (typeof value === 'number') {
    // console.log(`${value} is a number`);
} else {
    // console.log(`${value} is not a number`);
}

// Checking if a boolean variable is true or false

let isActive = true;
if (isActive) {
    // console.log("The variable isActive is true");
} else {
    // console.log("The variable isActive is false");
}

// Check if array is empty or not
let arr = [1, 2, 3];
if (arr.length === 0) {
    console.log("The array is empty");
} else {
    console.log("The array is not empty");
}
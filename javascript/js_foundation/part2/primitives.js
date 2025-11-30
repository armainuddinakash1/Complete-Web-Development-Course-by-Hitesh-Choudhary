// Number

let num1 = 42;
let num2 = 3.14;
let num3 = NaN;
let num4 = new Number(7); // Not recommended

// console.log(typeof num1); // "number"
// console.log(typeof num2); // "number"
// console.log(typeof num3); // "number"
// console.log(typeof num4); // "object"
// console.log(num4);
// console.log(num4.valueOf()); // 7

// Boolean

let bool1 = true;
let bool2 = false;
let bool3 = new Boolean(false); // Not recommended
// console.log(typeof bool1); // "boolean"
// console.log(typeof bool2); // "boolean"
// console.log(typeof bool3); // "object"
// console.log(bool3); // [Boolean: false]
// console.log(bool3.valueOf()); // false

// null and undefined

let val1 = null;
let val2; // undefined
// console.log(typeof val1); // "object" (this is a known quirk in JavaScript)
// console.log(typeof val2); // "undefined"
// console.log(val1); // null
// console.log(val2); // undefined

// String

let str1 = "Hello, World!";
let str2 = "JavaScript is fun.";
let str3 = `Template literals are great!`;
let str4 = new String("Not recommended"); // Not recommended
let str5 = `Value of num1 is ${num1}`; // Template literal with expression
let str6 = "Double quotes can \"escape\" characters.";

// console.log(typeof str1); // "string"
// console.log(typeof str2); // "string"
// console.log(typeof str3); // "string"
// console.log(typeof str4); // "object"
// console.log(str4); // [String: 'Not recommended']
// console.log(str4.valueOf()); // "Not recommended"
// console.log(typeof str5); // "string"
// console.log(str5); // "Value of num1 is 42"
// console.log(str6); // Double quotes can "escape" characters.

// Symbol

let sym1 = Symbol("uniqueIdentifier");
let sym2 = Symbol("uniqueIdentifier");  // Different from sym1
// console.log(typeof sym1); // "symbol"
// console.log(sym1 === sym2); // false
// console.log(sym1.description); // "uniqueIdentifier"
// console.log(sym2.description); // "uniqueIdentifier"
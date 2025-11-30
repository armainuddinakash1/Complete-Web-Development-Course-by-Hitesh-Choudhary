const user = {
  firstName: "John",
  "Last Name": "Doe",
  isLoggedIn: true
};

// const myFirstName = "john";
// myFirstName = "Mr J";
// console.log(myFirstName); // "Mr J"

user.firstName = "Mr. J";
user.email = "mr.j@example.com";

// console.log(user);        // {}
// console.log(user["Last Name"]); // "John"
// console.log(typeof user); // "object"

let today = new Date();
// console.log(today); // Current date and time
// console.log(today.getDate()); // Current day of the month

let heros = ["spiderman", "ironman", "thor", true, 34];

let anotherUser = [
  "John",
  "Doe",
  true
]

// console.log(anotherUser[0]); // "John"

let isValue = "2abc";
// console.log( isValue + 1 ); // 2
// console.log(Number(isValue)); // NaN
// console.log(Number(null)); // 0
console.log(Number(undefined)); // NaN
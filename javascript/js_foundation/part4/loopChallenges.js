/*
1. Write a `while` loop that calculates the sum of all numbers from 1 to 5 and stores the result in a variable called `sum`.
*/
let sum = 0;
let i = 1;
while (i <= 5) {
    sum += i;
    i++;
}
// console.log(sum);

/*
2. Write a `white` loop that counts down from 5 to 1 and store the result in an array called `countdown`.
*/
let countdown = [];
let j = 5;
while (j >= 1) {
    countdown.push(j);
    j--;
}
// console.log(countdown);

/*
3. Write a `do while` loop that prompts a user to enter their favorite tea untill they enter `stop`. Store each tea type in an array called `teaCollection`.
*/

/*
let teaCollection = [];
let tea;
do {
  tea = prompt("Enter your favorite tea (type 'stop' to finish):");
  if (tea !== 'stop') {
    teaCollection.push(tea);
  }
} while (tea !== 'stop');
*/

/*
4. Write a `do while` loop that adds numbers from 1 to 3 and stores the result in a variable called `total`.
*/
let total = 0;
let k = 1;
// console.log(total);
do {
    total += k;
    k++;
} while (k <= 3);
// console.log(total);

/*
5. Write a `for` loop that multiplies each element in the array `[2, 4, 6]` by 2 and stores the result in a new array named `multipliedNumbers`.
*/
let numbers = [2, 4, 6];
let multipliedNumbers = [];
for (let i = 0; i < numbers.length; i++) {
    let element = numbers[i];
    element *= 2;
    multipliedNumbers.push(element);
}
// console.log(multipliedNumbers);

/*
6. Write a `for` loop that lists all the cities in the array `["Paris", "New York", "Tokiyo", "London"]` and store each city in a new array named `cityList`.
*/

let cities = ["Paris", "New York", "Tokiyo", "London"];
let cityList = [];

for (let i = 0; i < cities.length; i++) {
  const element = cities[i];
  cityList.unshift(element)
}
console.log(cityList)


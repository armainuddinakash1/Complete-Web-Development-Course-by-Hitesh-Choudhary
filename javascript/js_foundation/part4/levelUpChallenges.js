/*
1. Write a `for` loop that loops through the array `["green tea", "black tea", "chai", "oolong tea"]` and stops the loop when it finds `"chai"` in a new array named `selectedTeas`.
*/
let teas = ["green tea", "black tea", "chai", "oolong tea"];
let selectedTeas = [];
for (let i = 0; teas[i] !== "chai"; i++) {
    const element = teas[i];
    selectedTeas.push(element);
}
// console.log(selectedTeas)

/*
2. Write a `for` loop that loops through the array `["London", "New York", "Paris", "Berlin"]` and skips `"Paris"`. Store other cities in a new array named `visitedCities`.
*/
let cities = ["London", "New York", "Paris", "Berlin"];
let visitedCities = [];

// for (let i = 0; i < cities.length; i++) {
//     const element = cities[i];
//     if (element !== "Paris") {
//         visitedCities.push(element);
//     }
// }

for (let i = 0; i < cities.length; i++) {
    const element = cities[i];
    if (element.toLowerCase() === "paris") {
        continue;
    }
    visitedCities.push(element);
}

// console.log(visitedCities);

/*
3. Use a `for-of` loop to iterate through the array `[1, 2, 3, 4, 5]` and stop when the number `4` is found. Store the numbers before `4` in an array named `smallNumbers`.
*/
let numbers = [1, 2, 3, 4, 5];
let smallNumbers = [];

for (const number of numbers) {
    if (number === 4) {
        break;
    }
    smallNumbers.push(number);
}
// console.log(smallNumbers)

/*
4. Use a `for-of` loop to iterate through the array `["chai", "green tea", "herbal tea", "black tea"]` and skip the `"herbal tea"`. Store the other teas in an array named `priferredTeas`.
*/
let teas1 = ["chai", "green tea", "herbal tea", "black tea"];
let priferredTeas = [];

for (const tea of teas1) {
    if (tea === "herbal tea") {
        continue;
    }
    priferredTeas.push(tea);
}
// console.log(priferredTeas);

/*
5. Use a `for-in` loop to loop through and object containing city population. Stop the loop when the population of `"Berlin"` is found and store all the privious cities' population in a new array named `cityPopulations`.
let cityPopulation = {
    "London": 8900000,
    "New York": 8400000,
    "Paris": 2200000,
    "Berlin": 3500000
};
*/
let cityPopulation = {
    London: 8900000,
    "New York": 8400000,
    Paris: 2200000,
    Berlin: 3500000,
    Dhaka: 5000000,
};
let cityPopulations = {};

for (const key in cityPopulation) {
    const value = cityPopulation[key];
    if (key === "Berlin") {
        break;
    }
    // console.log(key)
    // console.log(value)
    cityPopulations[key] = value;
}
// console.log(cityPopulations);

/*
6. Use a `for-in` loop to loop through an object containing city populations. Skip any city with a population below 3 million and store the rest in a new object `largeCities`.
let worldCities = {
    Sydney: 5000000,
    Tokyo: 9000000,
    Berlin: 3500000,
    Paris: 2200000,
};
*/
let worldCities = {
    Sydney: 5000000,
    Tokyo: 9000000,
    Berlin: 3500000,
    Paris: 2200000,
};
let largeCities = {};

for (const key in worldCities) {
    const element = worldCities[key];
    if (element < 3000000) {
        continue;
    }
    largeCities[key] = element;
}
// console.log(largeCities);

/*
7. Write a `forEach` loop that iterates through the array `["earl gray", "green tea", "chai", "oolong tea"]`. Stop the loop when `"chai"` is found, and store all the privious tea types in an array named `availableTeas`.
*/

let menuTeas = ["earl gray", "green tea", "chai", "oolong tea"];
let availableTeas = [];

menuTeas.forEach((element) => {
    if (element === "chai") {
        return;
    }
    availableTeas.push(element);
});
// console.log(availableTeas);

/*
8. Write a `forEach` loop that iterates through the array `["Berlin", "Tokyo", "Sydney", "Paris"]`. Skip the `"Sydney"` and store the other cities in a new array named `traveledCities`.
*/
let allCities = ["Berlin", "Tokyo", "Sydney", "Paris"];
let traveledCities = [];

allCities.forEach((element) => {
    if (element === "Sydney") {
        return;
    }
    traveledCities.push(element);
});
// console.log(traveledCities);

/*
9. Write a `for` loop that iterates through the array `[2, 5, 7, 9]`. Skip 7 and multiply the rest my 2. Store the results in a new array called `doubledNumbers`.
*/

let allNumbers = [2, 5, 7, 9];
let doubledNumbers = [];

for (let i = 0; i < allNumbers.length; i++) {
    const element = allNumbers[i];
    if (element === 7) {
        continue;
    }
    doubledNumbers.push(element * 2);
}
// console.log(doubledNumbers);

/*
10. use a `for-of` loop to iterate through the array `["chai", "green tea", "black tea", "jasmine tea", "herbal tea"]` and stop when the length of the current tea name is greater than 10. Store the teas iterated over in an array named `shortTeas`.
*/
let allTeas = ["chai", "green tea", "black tea", "jasmine tea", "herbal tea"];
let shortTeas = [];

for (const tea of allTeas) {
    if (tea.length > 10) {
        break;
    }
    shortTeas.push(tea)
}
console.log(shortTeas)

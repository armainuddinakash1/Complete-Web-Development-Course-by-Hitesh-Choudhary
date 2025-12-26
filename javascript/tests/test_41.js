/*
Task 1: Creating a Counter Using Closures

Create a function createCounter() that returns a function which increments and returns a counter value each time it is called.
*/
function createCounter() {
    let n = 0;
    return function counter() {
        n++;
        return n;
    };
}
const count = createCounter();
// console.log(count())
// console.log(count())
// console.log(count())

/*
Task 2: Rate Limiter Function

Create a function rateLimiter(fn, limit) that returns a new function. The returned function allows calling fn only once within a limit time in milliseconds. If it is called again before the limit is reached, it should return "Rate limit exceeded".
*/
function rateLimiter(fn, limit) {
    let lastCall = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastCall < limit) {
            return "Rate limit exceeded";
        } else {
            lastCall = now;
            return fn(...args);
        }
    };
}
function greet(name, age) {
    return `Hi, I am ${name}, and I am ${age} years old.`;
}
const callGreet = rateLimiter(greet, 2000);
// console.log(callGreet("Akash", 21))
// setTimeout(() => {
//   console.log(callGreet("Ashraful", 19))
// }, 1000);
// setTimeout(() => {
//   console.log(callGreet("Ibrahim", 9))
// }, 3000);
/*
Task 3: Memoization Function

Write a function memorize(fn) that returns a memoized version of fn. The memoized function should cache the results of function calls, and return the cached result if the same inputs are provided again.
*/
/*
suppose someone passes a function that takes two values and return the addition of those two values.
let say someone passes 5 and 6 to the add function then it will return 30 after calculating and if someone passes 2 and 3 the add function will return 6.
and if then someone passes 5 and 6 or 2 and 3 the add function will give the result not by calculating but by retreving the result from the database
*/
/*
First I have to store the passing values
Second I have to store the return value
*/

function memorize(fn) {
  const cache = {}
  return function (...args) {
    let key = JSON.stringify(args)
    if (cache[key]) {
      return cache[key]
    } else {
      let result = fn(...args)
      cache[key] = result
      return result
    }
  }
}
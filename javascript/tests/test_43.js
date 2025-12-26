/*
THIS and Binding Context
Task 1: Bind the Correct Context

Create an object person with properties name and a method introduce(). Use the bind() method to ensure the method works correctly when passed to another function.
*/
// Task 1
/*
const person = {
    name: "akash",
    introduce(){
        return  `Hi, I am ${this.name}`
    }
};
const unboundGetIntroduce = person.introduce
const boundGetIntroduce = unboundGetIntroduce.bind(person)
// console.log(person.introduce())
// console.log(boundGetIntroduce());
*/
// 1. Define the object
const person = {
  name: "Alex",
  introduce: function() {
    console.log(`Hi, my name is ${this.name}.`);
  }
};

// 2. The issue: passing the method without binding
const greet = person.introduce;
greet(); // Result: "Hi, my name is undefined." (context is lost)

// 3. The fix: Use bind() to lock the context to 'person'
const boundIntroduce = person.introduce.bind(person);

// 4. Test it in another function
function executeCallback(callback) {
  callback();
}

executeCallback(boundIntroduce); // Result: "Hi, my name is Alex."

/*
Task 2: Using call() to Invoke a Function with Different Contexts

Write a function introduce() that uses the this keyword to introduce a person by name. Then, invoke introduce() using call() to introduce different people with the same function.
*/
// Task 2
/*
function introduce() {
    return `Hi, I am ${this.name}`
}


const person = {name: "Akash"}
const boundIntroduce = introduce.call(person)
const person2 = {name: "Ashraful"}
console.log(boundIntroduce)
*/

/*
Task 3: Using apply() to Pass Arguments with Context

Create a function sum() that accepts two numbers and uses this to access a multiplier value. Then, invoke sum() with different contexts using apply(), passing the numbers as an array.
*/
// Task 3
/*
// 1. Define the function
function sum(num1, num2) {
  // 'this.multiplier' will depend on the object we bind to the function
  const result = (num1 + num2) * this.multiplier;
  
  console.log(`Context: ${this.name} | Result: (${num1} + ${num2}) * ${this.multiplier} = ${result}`);
  return result;
}

// 2. Define different context objects
const doubleContext = {
  name: "Doubler",
  multiplier: 2
};

const tripleContext = {
  name: "Tripler",
  multiplier: 3
};

// 3. Invoke using apply() with arguments as an array
sum.apply(doubleContext, [10, 5]); // Output: Context: Doubler | Result: 15 * 2 = 30
sum.apply(tripleContext, [10, 5]); // Output: Context: Tripler | Result: 15 * 3 = 45
*/
/*
Iterators and Generators in JavaScript
Task 1: Creating a Simple Generator

Create a generator function numberGenerator() that yields numbers from 1 to 3.
*/
function* numberGenerator() {
    yield 1
    yield 2
    yield 3
}

/*
Task 2: Create a Custom Iterator

Create a custom iterator called rangeIterator(start, end) that returns an object that iterates over numbers from start to end.

Each call to .next() should return the next number in the range until it reaches end.
*/

function rangeIterator(start, end) {
    let current = start
    return {
        [Symbol.iterator](){
            return this
            
        },
        next(){
        if(current <= end){
            return {value: current++, done: false}
        }else{
            return {value: undefined, done: true}
        }
    }
    }
    
}
// console.log(rangeIterator(5, 10));
const gen = rangeIterator(5, 10)
// console.log(gen)
// console.log(gen.next())
// console.log(gen.next())
// console.log(gen.next())
// console.log(gen.next())
// console.log(gen.next())
// console.log(gen.next())
// console.log(gen.next())
/*
Task 3: Generator Function for Fibonacci Sequence

Create a generator function fibonacciGenerator() that yields numbers from the Fibonacci sequence indefinitely (1, 1, 2, 3, 5, 8, etc.).

Use the next() method to get the next Fibonacci number.
*/
function* fibonacciGenerator() {
    let prev = 1
    let curr = 1

    yield prev
    yield curr
    while (true) {
        let nextValue = prev + curr
        yield nextValue

        prev = curr
        curr = nextValue

    }
}
const fib = fibonacciGenerator()
console.log(fib.next().value)//1
console.log(fib.next().value)//1
console.log(fib.next().value)//2
console.log(fib.next().value)//3
console.log(fib.next().value)//5
console.log(fib.next().value)//8
console.log(fib.next().value)//13
console.log(fib.next().value)//21
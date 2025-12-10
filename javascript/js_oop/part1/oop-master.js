let car = {
    brand: "Toyota",
    model: "Camry",
    year: 2020,
    start: function () {
        return `I like ${this.brand} ${this.model} ${this.year}.`;
    },
};
// console.log(car.start())

function Person(name, age) {
    this.name = name;
    this.age = age;
}

let john = new Person("John", 20);
// console.log(john.name)

function Animal(type) {
    this.type = type;
}

Animal.prototype.speak = function () {
    return `${this.type} makes a sound`;
};
Array.prototype.akash = function () {
    return `Custom method ${this}`;
};

let myArray = [1, 2, 3];
// console.log(myArray.akash());

let myNewArray = [1, 2, 3, 4, 5, 6];
// console.log(myNewArray.akash());

class Vehicle {
    constructor(brand, model) {
        this.brand = brand;
        this.model = model;
    }
    start() {
        return `I like ${this.brand} ${this.model}`;
    }
}

class Car extends Vehicle {
    drive() {
        return `${this.brand} : This is an inheritance example.`;
    }
}
let myCar = new Car("Toyota", "Camry");
// console.log(myCar.start())
// console.log(myCar.drive())

let myVehicle = new Vehicle("Toyota", "Premio");
// console.log(myVehicle.brand)
// console.log(myVehicle.start())

// Encapsulation

class BankAccount {
    #balance = 0;
    deposit(amount) {
        this.#balance += amount;
        return this.#balance;
    }
    getBalance() {
        return `$ ${this.#balance}`;
    }
}

let account = new BankAccount();
// console.log(account.deposit(1000))

// Abstraction

class coffeeMachine {
    start() {
        // call DB
        // filter value
        return `starting the machine...`;
    }
    brewCoffee() {
        // complex calculation
        return `Brewing coffee...`;
    }
    pressStartButton() {
        let msgOne = this.start();
        let msgTwo = this.brewCoffee();
        return `${msgOne}\n${msgTwo}`;
    }
}

let myMachine = new coffeeMachine();
// console.log(myMachine.start());
// console.log(myMachine.brewCoffee());
// console.log(myMachine.pressStartButton())

// Pholymophism

class Bird {
    fly() {
        return `Flying...`;
    }
}

class Penguin extends Bird {
    fly() {
        return `Penguins can't fly`;
    }
}

let bird = new Bird();
let penguin = new Penguin();
// console.log(bird.fly())
// console.log(penguin.fly())

// static method

class Calculator {
    add(a, b) {
        return a + b;
    }
}

// let miniCalc = new Calculator();
// console.log(miniCalc.add(2, 3));

class Calculator2 {
    static add(a, b) {
        return a + b;
    }
}

// console.log(Calculator2.add(3, 4))

// Getters and Sellters

class Employee {
    #salary;
    constructor(name, salary) {
        if (salary < 1) {
            throw new Error("Salary cannot be less than 1 dollar");
        }
        this.name = name;
        this.#salary = salary;
    }

    get salary() {
        return this.#salary;
    }
    set salary(value) {
        if (value < 1) {
            console.error("Invalid Salary");
        } else {
            this.#salary = value;
        }
    }
}

let emp = new Employee("John", 50000);
// console.log(emp.salary);
emp.salary = 60000;
// console.log(emp.salary);


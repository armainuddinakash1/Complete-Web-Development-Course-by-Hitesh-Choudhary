function Person(name, age) {
  this.name = name
  this.age = age
}

function Car(brand, model) {
  this.brand = brand
  this.model = model
}

let myCar = new Car("toyota", "camry")
let myCar2 = new Car("toyota", "premio")
// console.log(myCar === myCar2)

function Tea(type) {
  this.type = type
  this.describe = function() {
    return `This is a cup of ${this.type}.`
  }
}
let lemonTea = new Tea("leamon tea")
// console.log(lemonTea.describe())

function Animal(species){
  this.species = species
}

Animal.prototype.sound = function(){
  return `${this.species} makes a sound`
}
let dog = new Animal("Dog")
// console.log(dog.sound())

let cat = new Animal("Cat");
// console.log(cat.sound());

function Drink(name) {
  if (!new.target) {
    throw new Error("Drink must be called with new keyword");
    
  }
  this.name = name
}
let chai = new Drink("Chai")
// console.log(chai.name)

let coffee = Drink("Coffee")
// console.log(coffee)

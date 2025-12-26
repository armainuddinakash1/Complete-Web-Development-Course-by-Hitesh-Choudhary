/*
Prototypal Inheritance in JavaScript

Task 1: Create Inheritance Using Prototypes

Create a constructor Animal with a method makeound(). Then create a constructor Dog that inherits from Animal and adds a method bark()
*/

/*
function Animal (animal){
    this.animal = animal
}

Animal.prototype.makeSound = function(){
    return `${this.animal} makes sound.`
}

function Dog(animal, name){
    Animal.call(this, animal)
    this.name = name
}

Dog.prototype = Object.create(Animal.prototype)
Dog.prototype.constructor = Dog;
Dog.prototype.bark = function(){
    return `${this.name} barks`
}
const tiger = new Animal("Tiger")
console.log(tiger.makeSound())

const matty = new Dog("Dog","Matty")
console.log(matty.makeSound())
console.log(matty.bark())
*/

/*
function Animal (){
}
Animal.prototype.makeSound = function(){
    return `Animal sound`
}
function Dog(){    
}
Dog.prototype = Object.create(Animal.prototype)
Dog.prototype.constructor = Dog;
Dog.prototype.bark = function(){
    return `Woof!`
}
const tiger = new Animal()

console.log(tiger.makeSound())
const matty = new Dog()
console.log(matty.makeSound())
console.log(matty.bark())
*/

/*
Task 2: Shape and Rectangle Inheritance

Create a constructor function Shape that takes color as a parameter and has a method getColor() that returns the color.

Create another constructor Rectangle that inherits from Shape and adds properties width and height. Add a method getArea() to Rectangle that returns the area of the rectangle.
*/
// Task 2

function Shape(color) {
    this.color = color
}
Shape.prototype.getColor = function () {
    return this.color
}
function Rectangle(width, height, color) {
    Shape.call(this, color)
    this.width = width
    this.height = height
}
Rectangle.prototype = Object.create(Shape.prototype)
Rectangle.prototype.constructor = Rectangle

Rectangle.prototype.getArea = function () {
    return this.width * this.height
}

const shapeOne = new Shape("green")
console.log(shapeOne.getColor())

const RectangleOne = new Rectangle(20, 20, "red")
console.log(RectangleOne.getArea())
console.log(RectangleOne.getColor())
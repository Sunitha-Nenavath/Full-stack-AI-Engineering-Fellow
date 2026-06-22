/**
 * PROTOTYPE CHAIN
 * ----------------
 * Every JS object has an internal link to another object called its
 * "prototype". When you try to access a property on an object, JS first
 * looks at the object itself. If it's not found, it looks at the object's
 * prototype, then that prototype's prototype, and so on -- until it hits
 * `null`. This sequence of links is the "prototype chain".
 */

// 1. Plain object example -------------------------------------------------
const animal = {
  eats: true,
  walk() {
    console.log("Animal walks");
  },
};

const rabbit = {
  jumps: true,
  __proto__: animal, // rabbit's prototype is now `animal`
};

console.log(rabbit.eats);  // true  -> not on rabbit, found on animal
rabbit.walk();              // "Animal walks" -> inherited method
console.log(rabbit.jumps); // true  -> own property

// 2. Constructor functions and .prototype ---------------------------------
// Every function has a `.prototype` property. Objects created with `new`
// get that function's prototype as their internal prototype.
function Animal(name) {
  this.name = name;
}

Animal.prototype.eats = true;
Animal.prototype.walk = function () {
  console.log(`${this.name} walks`);
};

function Rabbit(name) {
  Animal.call(this, name); // call parent constructor
}

// Link Rabbit's prototype to Animal's prototype to inherit methods
Rabbit.prototype = Object.create(Animal.prototype);
Rabbit.prototype.constructor = Rabbit;

Rabbit.prototype.jump = function () {
  console.log(`${this.name} jumps`);
};

const bugs = new Rabbit("Bugs");
bugs.walk(); // "Bugs walks" -> inherited from Animal.prototype
bugs.jump(); // "Bugs jumps" -> own prototype method
console.log(bugs.eats); // true -> inherited

// Checking the chain:
console.log(Object.getPrototypeOf(bugs) === Rabbit.prototype); // true
console.log(Object.getPrototypeOf(Rabbit.prototype) === Animal.prototype); // true
console.log(Object.getPrototypeOf(Animal.prototype) === Object.prototype); // true
console.log(Object.getPrototypeOf(Object.prototype)); // null -> end of chain

// 3. ES6 classes are syntactic sugar over the same prototype mechanism ----
class Vehicle {
  constructor(brand) {
    this.brand = brand;
  }
  drive() {
    console.log(`${this.brand} is driving`);
  }
}

class Car extends Vehicle {
  honk() {
    console.log(`${this.brand} says beep!`);
  }
}

const myCar = new Car("Toyota");
myCar.drive(); // inherited from Vehicle.prototype
myCar.honk();  // own method on Car.prototype

// Under the hood, `class ... extends` still builds a prototype chain:
console.log(Object.getPrototypeOf(Car.prototype) === Vehicle.prototype); // true

/**
 * KEY TAKEAWAYS
 * - `__proto__` / Object.getPrototypeOf() exposes the link to the next
 *   object in the chain.
 * - Property/method lookups walk UP the chain until found or until null.
 * - `class` syntax in ES6 is built on the exact same prototype chain --
 *   it's just cleaner syntax for what constructor functions already did.
 * - Own properties always shadow (override) inherited ones with the same name.
 */

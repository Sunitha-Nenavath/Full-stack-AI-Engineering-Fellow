# Advanced JavaScript — Code-Along Notes

**Fellow:** Nenavath Sunitha
**Program:** Dev Weekends Fellowship 2026
**Task:** Advanced JavaScript (Worth 20 points)

This repo contains my annotated notes and working code exercises covering
prototypes, ES6+ syntax, generators/iterators, and ES Modules vs CommonJS.
Every example below is runnable — see the `examples/` folder for the actual
`.js` files referenced throughout.

---

## 1. The Prototype Chain

**File:** [`examples/01-prototype-chain.js`](./examples/01-prototype-chain.js)

Every object in JavaScript has an internal link to another object, called
its **prototype**. When you access a property on an object, the JS engine:

1. Checks if the object has that property **directly (own property)**.
2. If not, it looks at the object's **prototype**.
3. If still not found, it looks at *that* object's prototype.
4. This continues until it reaches `Object.prototype`, whose prototype is
   `null` — the end of the chain.

```js
const animal = { eats: true };
const rabbit = { jumps: true, __proto__: animal };

rabbit.eats;  // true -> found on animal, not rabbit
```

**Constructor functions** use `.prototype` to share methods across all
instances without duplicating them per object:

```js
function Animal(name) { this.name = name; }
Animal.prototype.walk = function () { console.log(`${this.name} walks`); };

const dog = new Animal("Rex");
dog.walk(); // "Rex walks" -- method lives on Animal.prototype, not on `dog`
```

**ES6 `class` syntax** is syntactic sugar over this exact mechanism —
`extends` just wires up the prototype chain automatically:

```js
class Vehicle { drive() { console.log("driving"); } }
class Car extends Vehicle {}

new Car().drive(); // inherited via the prototype chain
```

> **Why it matters:** Understanding the prototype chain explains *why*
> methods defined on a class are shared across instances (memory-efficient),
> and *why* `instanceof` and inheritance work the way they do in JS.

---

## 2. ES6+ Syntax

**File:** [`examples/02-es6-syntax.js`](./examples/02-es6-syntax.js)

### Destructuring
Pulls values out of arrays/objects into variables directly.

```js
const [first, second] = ["red", "green"];
const { name, role = "Member" } = user; // with default value
```

### Spread (`...`)
**Expands** an iterable (array/object) into individual elements — used for
copying or merging.

```js
const merged = [...arr1, ...arr2];
const updatedConfig = { ...baseConfig, fontSize: 16 }; // override one key
```

### Rest (`...`)
Looks identical to spread but **collects** multiple values into a single
array — used in function parameters or destructuring.

```js
function sumAll(...nums) { return nums.reduce((a, b) => a + b, 0); }
const [head, ...rest] = [1, 2, 3, 4];
```

### Optional Chaining (`?.`)
Safely accesses nested properties/methods without manual null checks —
returns `undefined` instead of throwing if something along the chain
doesn't exist.

```js
student.address?.city;        // safe even if `address` is missing
api.fetchData?.();            // safe even if method doesn't exist
const city = student.address?.city ?? "Unknown"; // paired with nullish coalescing
```

> **Why it matters:** These features reduce boilerplate (`if` checks for
> null, manual array indexing, `Object.assign`) and make code easier to
> read and less error-prone.

---

## 3. Generators and Iterators

**File:** [`examples/03-generators-iterators.js`](./examples/03-generators-iterators.js)

### Iterator protocol
Any object that implements a `.next()` method returning `{ value, done }`
is an **iterator**. Arrays, strings, Maps, and Sets all implement this
internally, which is why `for...of` works on them.

```js
function makeRangeIterator(start, end) {
  let current = start;
  return {
    next() {
      if (current <= end) return { value: current++, done: false };
      return { value: undefined, done: true };
    },
  };
}
```

### Generators
A **generator function** (`function*`) is a simpler way to build an
iterator. Calling it doesn't run the function body — it returns a
generator object you control with `.next()`. Each call resumes execution
until the next `yield`.

```js
function* rangeGenerator(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

for (const num of rangeGenerator(1, 5)) console.log(num); // 1 2 3 4 5
```

Generators can also **receive values back in** through `.next(value)`,
and can model **infinite, lazily-evaluated sequences** (like an ID
generator) since they only compute the next value when asked.

```js
function* idGenerator() {
  let id = 1;
  while (true) yield id++;
}
```

You can also make any custom object iterable by giving it a
`[Symbol.iterator]` method implemented as a generator:

```js
const team = {
  members: ["A", "B"],
  [Symbol.iterator]: function* () {
    for (const m of this.members) yield m;
  },
};
for (const m of team) console.log(m); // works with for...of now
```

> **Why it matters:** Generators are the foundation for lazy evaluation,
> custom iterables, and (historically) were used to manage async flow
> before `async/await` existed.

---

## 4. ES Modules vs CommonJS

**Files:**
[`examples/esm-demo/`](./examples/esm-demo) (ESM) and
[`examples/cjs-demo/`](./examples/cjs-demo) (CommonJS)

| | **ES Modules (ESM)** | **CommonJS (CJS)** |
|---|---|---|
| Syntax | `import` / `export` | `require()` / `module.exports` |
| File extension | `.mjs` or `.js` with `"type": "module"` in package.json | `.cjs` or `.js` by default in Node |
| Loading | Asynchronous, statically analyzed at parse time | Synchronous, resolved at runtime |
| Top-level | Imports must be at the top level (no conditionals) | `require()` can be called anywhere, even conditionally |
| Tree-shaking | Supported (bundlers can drop unused exports) | Not supported — entire module object is loaded |
| Default environment | Browsers natively + modern Node | Default in Node.js (historically) |

**ESM example:**
```js
// math.mjs
export function add(a, b) { return a + b; }
export default function multiply(a, b) { return a * b; }

// app.mjs
import multiply, { add } from "./math.mjs";
```

**CommonJS example:**
```js
// math.cjs
function add(a, b) { return a + b; }
module.exports = { add };

// app.cjs
const { add } = require("./math.cjs");
```

> **Why it matters:** Node.js projects today often need to know both —
> many older packages still ship as CommonJS, while modern frontend
> tooling (Vite, Webpack, bundlers) and Node itself are standardizing on
> ES Modules. Knowing the difference helps you debug `"require is not
> defined"` or `"Cannot use import statement outside a module"` errors.

---

## How to Run These Examples

```bash
# Prototype chain
node examples/01-prototype-chain.js

# ES6+ syntax
node examples/02-es6-syntax.js

# Generators and iterators
node examples/03-generators-iterators.js

# ES Modules demo
node examples/esm-demo/app.mjs

# CommonJS demo
node examples/cjs-demo/app.cjs
```

All examples were tested and run successfully with Node.js.

---

## Reflections

Going through this task helped me see that a lot of "advanced" JS isn't
separate from what I already knew — it's the same fundamentals (objects,
functions, loops) expressed through more powerful syntax. The prototype
chain in particular made `class`/`extends` click in a way memorizing
syntax never did. Generators were the most unfamiliar concept, but
writing the infinite ID generator example made the "lazy evaluation"
idea concrete instead of abstract.

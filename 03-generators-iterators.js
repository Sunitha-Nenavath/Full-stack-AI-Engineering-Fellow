/**
 * ITERATORS AND GENERATORS
 * ------------------------
 * An ITERATOR is any object that implements the iterator protocol: it has
 * a `.next()` method that returns `{ value, done }`.
 *
 * A GENERATOR is a special function (declared with `function*`) that makes
 * creating iterators much easier. Calling a generator function doesn't run
 * its body immediately -- it returns a generator object (which is also an
 * iterator) that you control with `.next()`.
 */

// 1. THE ITERATOR PROTOCOL (manual version) --------------------------------

function makeRangeIterator(start, end) {
  let current = start;
  return {
    next() {
      if (current <= end) {
        const value = current;
        current++;
        return { value, done: false };
      }
      return { value: undefined, done: true };
    },
  };
}

const rangeIterator = makeRangeIterator(1, 3);
console.log(rangeIterator.next()); // { value: 1, done: false }
console.log(rangeIterator.next()); // { value: 2, done: false }
console.log(rangeIterator.next()); // { value: 3, done: false }
console.log(rangeIterator.next()); // { value: undefined, done: true }

// Built-in iterables (arrays, strings, Maps, Sets) already implement this
// protocol internally, which is why `for...of` works on them:
for (const char of "Hi") {
  console.log(char); // "H" then "i"
}

// 2. GENERATORS: THE EASY WAY TO BUILD ITERATORS ----------------------------

function* rangeGenerator(start, end) {
  for (let i = start; i <= end; i++) {
    yield i; // pause here, hand back `i`, wait for next .next() call
  }
}

const gen = rangeGenerator(1, 3);
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }

// Generators are iterable, so they work directly with for...of
for (const num of rangeGenerator(1, 5)) {
  console.log(num); // 1, 2, 3, 4, 5
}

// Spread also works because generators implement Symbol.iterator
console.log([...rangeGenerator(1, 4)]); // [1, 2, 3, 4]

// 3. GENERATORS CAN RECEIVE VALUES BACK IN ----------------------------------

function* chatBot() {
  const name = yield "What is your name?";
  const role = yield `Hi ${name}, what is your role?`;
  return `${name} is a ${role}`;
}

const convo = chatBot();
console.log(convo.next());          // { value: "What is your name?", done: false }
console.log(convo.next("Sunitha")); // { value: "Hi Sunitha, what is your role?", done: false }
console.log(convo.next("Fellow"));  // { value: "Sunitha is a Fellow", done: true }

// 4. INFINITE GENERATORS (lazy evaluation) -----------------------------------
// Generators only compute values when asked -- useful for infinite sequences.

function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const ids = idGenerator();
console.log(ids.next().value); // 1
console.log(ids.next().value); // 2
console.log(ids.next().value); // 3
// It never runs out -- it only computes the next value when you ask for it.

// 5. MAKING A CUSTOM OBJECT ITERABLE USING A GENERATOR ------------------------

const team = {
  members: ["Sunitha", "Arjun", "Priya"],
  [Symbol.iterator]: function* () {
    for (const member of this.members) {
      yield member;
    }
  },
};

for (const member of team) {
  console.log(member); // "Sunitha", "Arjun", "Priya"
}

/**
 * KEY TAKEAWAYS
 * - Iterator protocol = any object with a `.next()` returning { value, done }.
 * - Generator functions (`function*`) auto-implement that protocol using `yield`.
 * - `yield` pauses execution and can both send out a value and receive one back.
 * - Generators are great for lazy/infinite sequences and custom iterables.
 * - Adding a `[Symbol.iterator]` generator method makes any object work
 *   with `for...of` and the spread operator.
 */

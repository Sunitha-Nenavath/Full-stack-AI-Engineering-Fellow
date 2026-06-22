/**
 * ES6+ SYNTAX
 * -----------
 * Destructuring, spread/rest operators, and optional chaining are
 * modern JS features that make code shorter and safer to write.
 */

// 1. DESTRUCTURING ---------------------------------------------------------

// Array destructuring
const colors = ["red", "green", "blue"];
const [first, second, third] = colors;
console.log(first, second, third); // "red" "green" "blue"

// Skipping elements
const [, , thirdOnly] = colors;
console.log(thirdOnly); // "blue"

// Object destructuring
const user = { name: "Sunitha", age: 21, role: "Fellow" };
const { name, role } = user;
console.log(name, role); // "Sunitha" "Fellow"

// Renaming while destructuring
const { name: userName } = user;
console.log(userName); // "Sunitha"

// Default values
const { country = "India" } = user;
console.log(country); // "India" -> not on `user`, default used

// Nested destructuring
const profile = {
  name: "Sunitha",
  links: { github: "github.com/Sunitha-Nenavath", linkedin: "linkedin.com/in/..." },
};
const { links: { github } } = profile;
console.log(github); // "github.com/Sunitha-Nenavath"

// Destructuring function parameters
function printUser({ name, role }) {
  console.log(`${name} - ${role}`);
}
printUser(user); // "Sunitha - Fellow"

// 2. SPREAD OPERATOR (...) --------------------------------------------------

// Spreading arrays (copy / merge)
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const merged = [...arr1, ...arr2];
console.log(merged); // [1, 2, 3, 4, 5, 6]

// Spreading objects (copy / merge / override)
const baseConfig = { theme: "dark", fontSize: 14 };
const userConfig = { ...baseConfig, fontSize: 16 }; // override fontSize
console.log(userConfig); // { theme: "dark", fontSize: 16 }

// Spreading into function calls
function sum(a, b, c) {
  return a + b + c;
}
const nums = [1, 2, 3];
console.log(sum(...nums)); // 6

// 3. REST OPERATOR (...) -----------------------------------------------------
// Looks identical to spread but collects values INSTEAD of expanding them.

function sumAll(...nums) {
  return nums.reduce((total, n) => total + n, 0);
}
console.log(sumAll(1, 2, 3, 4)); // 10

// Rest in destructuring
const [head, ...rest] = [10, 20, 30, 40];
console.log(head, rest); // 10 [20, 30, 40]

const { name: n2, ...otherDetails } = user;
console.log(otherDetails); // { age: 21, role: "Fellow" }

// 4. OPTIONAL CHAINING (?.) --------------------------------------------------
// Safely access deeply nested properties without manual null checks.

const student = {
  name: "Sunitha",
  address: { city: "Hyderabad" },
};

console.log(student.address?.city);   // "Hyderabad"
console.log(student.contact?.email);  // undefined (no error, even though `contact` doesn't exist)

// Optional chaining with function calls
const api = {
  getData: () => "some data",
};
console.log(api.getData?.());   // "some data"
console.log(api.fetchData?.()); // undefined -> method doesn't exist, no crash

// Optional chaining with arrays
const items = null;
console.log(items?.[0]); // undefined, instead of throwing "Cannot read property of null"

// Combining optional chaining with nullish coalescing (??)
const city = student.address?.city ?? "Unknown city";
console.log(city); // "Hyderabad"

const email = student.contact?.email ?? "No email provided";
console.log(email); // "No email provided"

/**
 * KEY TAKEAWAYS
 * - Destructuring extracts values from arrays/objects into variables concisely.
 * - Spread (...) expands an iterable into individual elements (copy/merge).
 * - Rest (...) collects multiple arguments/elements into a single array.
 * - Optional chaining (?.) prevents runtime errors when accessing
 *   properties that might not exist, returning `undefined` instead of throwing.
 */

// app.mjs (ES Module)
// Named imports use destructuring-like syntax; default import has any name.
import multiply, { add, subtract } from "./math.mjs";

console.log(add(2, 3));       // 5
console.log(subtract(5, 2));  // 3
console.log(multiply(4, 3));  // 12

// ES Modules are loaded asynchronously and are statically analyzable --
// imports must be at the top level (cannot be conditional or inside an if).
// This is what allows tools like bundlers to "tree-shake" unused exports.

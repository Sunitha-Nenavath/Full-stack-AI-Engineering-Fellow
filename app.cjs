// app.cjs (CommonJS Module)
// `require()` is synchronous and can be called anywhere, even conditionally.
const { add, subtract, multiply } = require("./math.cjs");

console.log(add(2, 3));      // 5
console.log(subtract(5, 2)); // 3
console.log(multiply(4, 3)); // 12

// CommonJS loads modules synchronously and require() can be called
// conditionally (e.g. inside an if-block) since it's just a function call,
// not a static declaration like ESM's `import`.
if (true) {
  const dynamicallyLoaded = require("./math.cjs");
  console.log(dynamicallyLoaded.add(10, 20)); // 30
}

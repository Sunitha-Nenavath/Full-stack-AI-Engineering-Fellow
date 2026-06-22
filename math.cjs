// math.cjs (CommonJS Module)
// Exports are attached to `module.exports` -- a regular object.
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

module.exports = { add, subtract, multiply };

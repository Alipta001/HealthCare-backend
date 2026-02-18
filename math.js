const add = (a, b) => {
  return a + b;
};

const mul = (a, b) => {
  return a - b;
};

// basic way
// module.exports.mul = mul;
// module.exports.add = add;

// multiple way

module.exports = {
  mul,
  add,
};

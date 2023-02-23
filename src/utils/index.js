const inputValidator = {
  isNumber: (number) => Number.isInteger(number),
  isNumberInLottoRange: (number) => number <= 45 && number >= 1,
  isUniqueArray: (array) => new Set(array).size === array.length,
};

const pickRandomNumberInRange = (start, end) =>
  Math.floor(Math.random() * (end + 1 - Math.ceil(start))) + Math.ceil(start);

module.exports = { pickRandomNumberInRange, inputValidator };

const Console = require('./Console');

const inputValidator = {
  isNumber: (number) => Number.isInteger(number) || Number.isNaN(number),
  isNumberInLottoRange: (number) => number <= 45 && number >= 1,
  isUniqueArray: (array) => {
    const set = new Set(array);
    return set.size === array.length;
  },
};

const pickRandomNumberInRange = (start, end) => {
  return (
    Math.floor(Math.random() * (end + 1 - Math.ceil(start))) + Math.ceil(start)
  );
};

const errorHandler = (error, again) => {
  Console.print(error.message);
  again();
};

module.exports = { pickRandomNumberInRange, inputValidator, errorHandler };

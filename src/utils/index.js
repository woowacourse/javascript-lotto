const inputValidator = {
  isNumber: (number) => Number.isInteger(number) || Number.isNaN(number),
  isNumberInLottoRange: (number) => number <= 45 && number >= 1,
  isUniqueArray: (array) => {
    const set = new Set(array);
    return set.size === array.length;
  },
};

module.exports = inputValidator;

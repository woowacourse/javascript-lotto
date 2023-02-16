const Validation = {
  isNumber(number) {
    return this.isValidInputType(number, /^[0-9]+$/);
  },

  isUnitOfMoney(money, unit) {
    return money % unit === 0 && money !== 0;
  },

  isValidLengthWithCount(array, count) {
    return array.length === count;
  },

  hasDuplicatedNumber(array) {
    return new Set(array).size !== array.length;
  },

  isIncludedNumber(array, number) {
    return array.includes(number);
  },

  isValidInputType(string, regex) {
    return regex.test(string);
  },
};

module.exports = Validation;

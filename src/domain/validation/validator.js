const { BLANK_REGEXP, EMPTY_STRING } = require('../../constants/constants');

const validator = {
  isNumber(input) {
    return isNaN(input) ? false : true;
  },

  isBlankIncluded(input) {
    return BLANK_REGEXP.test(input);
  },

  isEmpty(input) {
    return input === EMPTY_STRING ? true : false;
  },

  isSmallerOrEqualThanZero(input) {
    return input <= 0;
  },

  isValidUnit(input) {
    return input % 1000 === 0;
  },
};

module.exports = validator;

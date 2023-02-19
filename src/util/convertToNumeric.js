const { ERROR_MESSAGE } = require('../constant/message');

const isEmptyString = (targetString) => targetString === '';
const isSpace = (character) => character === ' ';

const validateNumericString = (numericString) => {
  if (isEmptyString(numericString)) {
    throw new Error(ERROR_MESSAGE.NULL);
  }

  const characters = numericString.split('');

  characters.forEach((character) => {
    if (isSpace(character)) {
      throw new Error(ERROR_MESSAGE.HAS_BLANK);
    }
    if (isNaN(character)) {
      throw new Error(ERROR_MESSAGE.NOT_A_NUMBER);
    }
  });
};

const convertToNumeric = (numericString) => {
  validateNumericString(numericString);
  return Number(numericString);
};

module.exports = convertToNumeric;

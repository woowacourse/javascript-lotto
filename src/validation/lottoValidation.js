const { default: MESSAGE } = require('../constants/message');
const { default: NUMBER } = require('../constants/number');

const LottoValidation = {
  validateNumbers(numbers = []) {
    this.validateInNumbersRange(numbers);
    this.validateNumbersLength(numbers);
    this.validateDuplicationNumbers(numbers);
  },

  validateBonusNumber(winNumbers = [], number = 0) {
    this.validateInNumbersRange([number]);
    this.validateDuplicationNumbers([...winNumbers, number]);
  },

  validateInNumbersRange(numbers = []) {
    numbers.forEach((numberString) => {
      const number = Number(numberString);
      if (!Number.isInteger(number) || number > NUMBER.LOTTO_END_NUMBER || number < NUMBER.LOTTO_START_NUMBER) {
        throw new Error(MESSAGE.ERROR.NUMBERS_RANGE_ERROR);
      }
    });
  },

  validateNumbersLength(numbers = []) {
    if (numbers.length !== NUMBER.LOTTO_LENGTH) {
      throw new Error(MESSAGE.ERROR.NUMBERS_LENGTH_ERROR);
    }
  },

  validateDuplicationNumbers(numbers = []) {
    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== numbers.length) {
      throw new Error(MESSAGE.ERROR.NUMBERS_DUPLICATION_ERROR);
    }
  },
};

export default LottoValidation;

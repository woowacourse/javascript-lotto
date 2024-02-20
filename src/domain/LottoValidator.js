import Message from '../constants/Message';

const { ERROR } = Message;

const LottoValidator = {
  validateNumbersLength(numbers) {
    if (numbers.length !== 6) {
      throw new Error(ERROR.LOTTO_NUMBERS_LENGTH);
    }
  },

  validateNumbersDuplicate(numbers) {
    if (new Set(numbers).size !== numbers.length) {
      throw new Error(ERROR.LOTTO_NUMBERS_NO_DUPLICATE);
    }
  },

  validateNumbersType(numbers) {
    if (!numbers.every((number) => Number.isInteger(Number(number)))) {
      throw new Error(ERROR.LOTTO_NUMBERS_TYPE);
    }
  },

  validateNumbersRange(numbers) {
    if (!numbers.every((number) => number >= 1 && number <= 45)) {
      throw new Error(ERROR.LOTTO_NUMBERS_RANGE);
    }
  },
};

export default LottoValidator;

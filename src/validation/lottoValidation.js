import { ERROR_MESSAGE } from '../constants/message';
import NUMBER from '../constants/number';

const LottoValidation = {
  validateNumbers(numbers = []) {
    this.validateInNumbersRange(numbers);
    this.validateNumbersLength(numbers);
    this.validateDuplicationNumbers(numbers);
  },

  validateInNumbersRange(numbers) {
    numbers.forEach((numberString) => {
      const number = Number(numberString);
      if (!Number.isInteger(number) || number > NUMBER.LOTTO_END_NUMBER || number < NUMBER.LOTTO_START_NUMBER) {
        throw new Error(`${ERROR_MESSAGE.PREFIX} ${ERROR_MESSAGE.NUMBERS_RANGE}`);
      }
    });
  },

  validateNumbersLength(numbers = []) {
    if (numbers.length !== NUMBER.LOTTO_NUMBERS_LENGTH) {
      throw new Error(`${ERROR_MESSAGE.PREFIX} ${ERROR_MESSAGE.NUMBERS_LENGTH}`);
    }
  },

  validateDuplicationNumbers(numbers = []) {
    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== numbers.length) {
      throw new Error(`${ERROR_MESSAGE.PREFIX} ${ERROR_MESSAGE.NUMBERS_DUPLICATION}`);
    }
  },
};

export default LottoValidation;

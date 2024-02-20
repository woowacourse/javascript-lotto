import {
  isDivisibleByPrice,
  isDuplicatedLottoNumber,
  isInteger,
  isLottoNumberInRange,
  isValidLottoNumberCount,
  isValidNumbersOfTickets,
} from './utils';

const Validator = {
  validateRandomNumber(number) {
    const isValid = isInteger(number) && isLottoNumberInRange(number);

    if (!isValid) {
      throw new Error('error');
    }
  },

  validateLottoTickets(numbers) {
    const isValid =
      numbers.every((number) => {
        this.validateRandomNumber(number);
      }) &&
      isValidLottoNumberCount(numbers) &&
      isDuplicatedLottoNumber(numbers);

    if (!isValid) {
      throw new Error('error');
    }
  },

  validatePaymentAmount(number) {
    const isValid =
      isInteger(number) &&
      isDivisibleByPrice(number) &&
      isValidNumbersOfTickets(number);

    if (!isValid) {
      throw new Error('error');
    }
  },
};

export default Validator;

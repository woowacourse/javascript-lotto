import { ERROR_MESSAGE } from "./constants/errorMessage";

class Validator {
  validatePrice(price) {
    if (isNaN(price)) {
      throw new Error(ERROR_MESSAGE.NOT_NUMBER);
    }
    if (price % 1000 !== 0 || price <= 0) {
      throw new Error(ERROR_MESSAGE.INVALID_AMOUNT);
    }
  }
  validateLottoNumber(number) {
    if (number < 1 || number > 45)
      throw new Error(ERROR_MESSAGE.INVALID_NUMBER_RANGE);
    if (!Number.isInteger(number))
      throw new Error(ERROR_MESSAGE.MUST_BE_INTEGER);
    if (isNaN(number)) throw new Error(ERROR_MESSAGE.NOT_NUMBER);
  }
  validateLottoNumbers(numbers) {
    if (numbers.length !== 6) {
      throw new Error(ERROR_MESSAGE.INVALID_NUMBER_LENGTH);
    }

    const set = new Set(numbers);

    if (set.size !== numbers.length) {
      throw new Error(ERROR_MESSAGE.MUST_BE_NOT_DUPLICATE);
    }

    numbers.forEach((number) => {
      this.validateLottoNumber(number);
    });
  }

  validateBonusNumber(lottoNumbers, bonusNumber) {
    this.validateLottoNumber(bonusNumber);
    if (lottoNumbers.includes(bonusNumber))
      throw new Error(ERROR_MESSAGE.MUST_BE_NOT_DUPLICATE_WITH_WINNINGNUMBER);
  }
}

export default Validator;

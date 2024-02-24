import LottoSeller from "../domain/LottoSeller.js";
import MESSAGES from "../view/constants/messages.js";
import NUMBERS from "../domain/constants/numbers.js";

class LottoValidator {
  static validateBuyAmount(number) {
    this.#validateInteger(number);
    this.#validateDividableByLottoPrice(number);
    this.#validateInBuyAmountRange(number);
  }

  static validateLottoNumbers(numbers) {
    this.#validateLottoNumbersLength(numbers);
    this.#validateNumbersInLottoRange(numbers);
    this.#validateUniqueElements(numbers);
  }

  static validateBonusNumber(bonusNumber, winningNumbers) {
    this.#validateInteger(bonusNumber);
    this.#validateNumberInLottoRange(bonusNumber);
    this.#validateUniqueElements([...winningNumbers, bonusNumber]);
  }

  static validateNonNegativeIntegerString(string) {
    const isNonNegativeInteger = /^[0-9]+$/.test(string);
    if (!isNonNegativeInteger)
      throw new Error(MESSAGES.ERROR.nonNegativeIntegerString);
  }

  static #validateNumbersInLottoRange(numbers) {
    numbers.forEach((number) => this.#validateNumberInLottoRange(number));
  }

  static #validateNumberInLottoRange(number) {
    if (number < NUMBERS.minLottoNumber || NUMBERS.maxLottoNumber < number) {
      throw new Error(MESSAGES.ERROR.notInLottoNumberRange);
    }
  }

  static #validateUniqueElements(array) {
    if (array.length !== new Set(array).size) {
      throw new Error(MESSAGES.ERROR.hasDuplicateElements);
    }
  }

  static #validateLottoNumbersLength(numbers) {
    if (numbers.length !== NUMBERS.lottoNumbersLength) {
      throw new Error(MESSAGES.ERROR.invalidLottoNumbersLength);
    }
  }

  static #validateInteger(number) {
    if (!Number.isInteger(number)) {
      throw new Error(MESSAGES.ERROR.notInteger);
    }
  }

  static #validateDividableByLottoPrice(number) {
    if (number % LottoSeller.LOTTO_PRICE) {
      throw new Error(
        `${MESSAGES.ERROR.undividableByLottoPriceHead}${LottoSeller.LOTTO_PRICE}${MESSAGES.ERROR.undividableByLottoPriceTail}`
      );
    }
  }
  static #validateInBuyAmountRange(number) {
    const MIN_BUY_AMOUNT = LottoSeller.LOTTO_PRICE;
    const MAX_BUY_AMOUNT = LottoSeller.LOTTO_PRICE * 1000000;

    const isInRange = MIN_BUY_AMOUNT <= number && number <= MAX_BUY_AMOUNT;

    if (!isInRange) {
      throw new Error(
        `${MESSAGES.ERROR.invalidBuyAmountRangeHead}${MIN_BUY_AMOUNT}${MESSAGES.ERROR.invalidBuyAmountRangeMiddle}${MAX_BUY_AMOUNT}${MESSAGES.ERROR.invalidBuyAmountRangeTail}`
      );
    }
  }
}

export default LottoValidator;

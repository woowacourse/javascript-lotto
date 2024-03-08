import LottoSeller from "../domain/LottoSeller.js";
import MESSAGES from "../view/ConsoleView/constants/messages.js";
import NUMBERS from "../domain/constants/numbers.js";

class LottoValidator {
  static validateBuyPrice(number) {
    this.#validateInteger(number);
    this.#validateDividableByLottoPrice(number);
    this.#validateInBuyPriceRange(number);
  }

  static validateLotto(numbers) {
    this.#validateLottoLength(numbers);
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
    if (string === "") throw new Error(MESSAGES.ERROR.notBlankInLottoNumber);
    if (!isNonNegativeInteger)
      throw new Error(MESSAGES.ERROR.nonNegativeIntegerString);
  }

  static #validateNumbersInLottoRange(numbers) {
    numbers.forEach((number) => this.#validateNumberInLottoRange(number));
  }

  static #validateNumberInLottoRange(number) {
    if (number === 0)
      throw new Error(MESSAGES.ERROR.notZeroOrBlankInLottoNumber);
    if (number < NUMBERS.minLottoNumber || NUMBERS.maxLottoNumber < number) {
      throw new Error(MESSAGES.ERROR.notInLottoNumberRange);
    }
  }

  static #validateUniqueElements(array) {
    if (array.length !== new Set(array).size) {
      throw new Error(MESSAGES.ERROR.hasDuplicateElements);
    }
  }

  static #validateLottoLength(numbers) {
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

  static #validateInBuyPriceRange(number) {
    const MIN_BUY_PRICE = LottoSeller.LOTTO_PRICE;
    const MAX_BUY_PRICE = LottoSeller.LOTTO_PRICE * 10_000_000;
    const isInRange = MIN_BUY_PRICE <= number && number <= MAX_BUY_PRICE;
    if (!isInRange) {
      throw new Error(
        `${MESSAGES.ERROR.invalidBuyPriceRangeHead}${MIN_BUY_PRICE}${MESSAGES.ERROR.invalidBuyPriceRangeMiddle}${MAX_BUY_PRICE}${MESSAGES.ERROR.invalidBuyPriceRangeTail}`
      );
    }
  }
}

export default LottoValidator;

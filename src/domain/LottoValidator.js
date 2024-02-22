import Lotto from "./Lotto.js";
import LottoSeller from "./LottoSeller.js";

class LottoValidator {
  static validateBuyAmount(number) {
    this.#validateInteger(number);
    this.#validateDividableByLottoPrice(number);
    this.#validateInBuyAmountRange(number);
  }

  static validateLottoNumbers(numbers) {
    this.#validateLottoNumbersLength(numbers);
    this.#validateIntegers(numbers);
    this.validateNumbersInRange(numbers);
    this.validateUniqueElements(numbers);
  }

  static validateBonusNumber(bonusNumber, winningNumbers) {
    this.#validateInteger(bonusNumber);
    this.validateNumberInRange(bonusNumber);
    this.validateUniqueElements([...winningNumbers, bonusNumber]);
  }

  static validateBonusNumberString(string) {}

  static validateNumbersInRange(numbers) {
    numbers.forEach((number) => this.validateNumberInRange(number));
  }

  static validateNumberInRange(number) {
    if (number < Lotto.MIN_LOTTO_NUMBER || number > Lotto.MAX_LOTTO_NUMBER) {
      throw new Error("[ERROR] 유효한 범위 로또 숫자가 아닙니다.");
    }
  }

  static validateUniqueElements(array) {
    if (array.length !== new Set(array).size) {
      throw new Error("[ERROR] 중복된 숫자가 포합됩니다.");
    }
  }

  static validateLottoNumberString(string) {
    this.validateNonNegativeIntegerString(string);
    this.validateNumberInRange(Number(string));
  }

  static validateNonNegativeIntegerString(string) {
    const isNonNegativeInteger = /^[0-9]+$/.test(string);
    if (!isNonNegativeInteger)
      throw new Error("[ERROR] 10진수 양의 정수로 변환되는 숫자가 아닙니다");
  }

  static #validateLottoNumbersLength(numbers) {
    if (numbers.length !== Lotto.NUMBERS_LENGTH) {
      throw new Error("[ERROR] 유효한 개수의 로또 숫자가 아닙니다");
    }
  }

  static #validateIntegers(numbers) {
    numbers.forEach((number) => this.#validateInteger(number));
  }

  static #validateInteger(number) {
    if (!Number.isInteger(number)) {
      throw new Error("[ERROR] 정수가 아닌 값입니다.");
    }
  }

  static #validateDividableByLottoPrice(number) {
    if (number % LottoSeller.LOTTO_PRICE) {
      throw new Error(
        `[ERROR] 로또 금액(${LottoSeller.LOTTO_PRICE})으로 나눠지지 않는 금액입니다.`
      );
    }
  }

  static #validateInBuyAmountRange(number) {
    const MIN_BUY_AMOUNT = LottoSeller.LOTTO_PRICE;
    const MAX_BUY_AMOUNT = Number.MAX_SAFE_INTEGER;

    const isInRange = MIN_BUY_AMOUNT <= number && number <= MAX_BUY_AMOUNT;

    if (!isInRange) {
      throw new Error(
        `[ERROR] 유효한 구입 금액 범위(${MIN_BUY_AMOUNT} ~ ${MAX_BUY_AMOUNT})를 벗어났습니다.`
      );
    }
  }
}

export default LottoValidator;

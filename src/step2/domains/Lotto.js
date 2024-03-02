import { ERROR_MESSAGES, LOTTO_RULES } from "../constants/lotto";
import InvalidInputException from "../exceptions/InvalidInputException";

class Lotto {
  #numbers;

  constructor(numbers) {
    Lotto.#validate(numbers);
    this.#numbers = numbers;
  }

  static #validate(numbers) {
    Lotto.#validateNumbersType(numbers);
    Lotto.#validateLength(numbers);
    Lotto.#validateUniqueness(numbers);
  }

  static #validateNumbersType(numbers) {
    const regex = /^(?:[1-9]|[1-3][0-9]|4[0-5])$/;

    if (!numbers.every((number) => regex.test(number))) {
      throw new InvalidInputException(ERROR_MESSAGES.invalidNumbersType);
    }
  }

  static #validateLength(numbers) {
    if (numbers.length !== LOTTO_RULES.length) {
      throw new InvalidInputException(ERROR_MESSAGES.invalidLottoLength);
    }
  }

  static #validateUniqueness(numbers) {
    if (new Set(numbers).size !== numbers.length) {
      throw new InvalidInputException(ERROR_MESSAGES.invalidLottoUniqueness);
    }
  }

  #countMatchedNumber(answer) {
    return this.#numbers.filter((number) => answer.includes(number)).length;
  }

  hasNumber(number) {
    return this.#numbers.includes(number);
  }

  getMatchedInfo(answer, bonusNumber) {
    console.log(this.#numbers);
    const matchedCount = this.#countMatchedNumber(answer);
    const hasBonusNumber = this.hasNumber(bonusNumber);

    return { matchedCount, hasBonusNumber };
  }

  getNumbers() {
    return [...this.#numbers];
  }
}

export default Lotto;

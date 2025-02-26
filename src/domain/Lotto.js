import Validator from "../validation/validator.js";
import { throwError } from "../utils/throwError.js";
import { ERROR } from "../constants/message.js";
import { LOTTO_NUMBER } from "../constants/lotto.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = this.sortLottoNumber(numbers);
    this.validate(this.#numbers);
  }

  validate(numbers) {
    numbers.forEach((number) => {
      Validator.empty(number);
      Validator.number(number);
      Validator.range({ min: LOTTO_NUMBER.MIN, max: LOTTO_NUMBER.MAX }, number);
    });

    if (new Set(numbers).size !== numbers.length) {
      throwError(ERROR.DUPLICATE);
    }
    if (numbers.length !== LOTTO_NUMBER.LENGTH) {
      throwError(ERROR.LENGTH);
    }
  }

  sortLottoNumber(numbers) {
    const arr = [...numbers];
    return arr.sort((a, b) => a - b);
  }

  getLottoNumbers() {
    return this.#numbers;
  }

  getSameNumbersLength(givenLottoNumber) {
    return this.#numbers.filter((number) => givenLottoNumber.includes(number))
      .length;
  }

  hasNumber(number) {
    return this.#numbers.includes(number);
  }
}

export default Lotto;

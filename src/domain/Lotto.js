import {
  validateCount,
  validateNoDuplicate,
  validateRange,
} from "../utils/validator.js";

class Lotto {
  constructor(lottoNumberList) {
    this.#validate(lottoNumberList);
    this.numbers = [...lottoNumberList].sort((a, b) => a - b);
  }

  #validate(numbers) {
    validateCount(numbers);
    validateNoDuplicate(numbers);
    numbers.forEach((number) => validateRange(number));
  }

  getNumbers() {
    return [...this.numbers];
  }
}

export default Lotto;

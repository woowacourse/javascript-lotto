import {
  validateCount,
  validateNoDuplicate,
  validateRange,
} from "./utils/validator";

class Lotto {
  constructor(lottoNumberList) {
    this.#validate(lottoNumberList);
    this.numbers = [...lottoNumberList].sort((a, b) => a - b);
  }

  #validate(numbers) {
    validateCount(numbers);
    validateNoDuplicate(numbers);
    validateRange(numbers);
  }

  getNumbers() {
    return [...this.numbers];
  }
}

export default Lotto;

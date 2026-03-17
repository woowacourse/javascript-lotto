import { validateLottoNumbers } from "../utils/validator.js";

class Lotto {
  constructor(lottoNumberList) {
    this.#validate(lottoNumberList);
    this.numbers = [...lottoNumberList].sort((a, b) => a - b);
  }

  #validate(numbers) {
    validateLottoNumbers(numbers);
  }

  getNumbers() {
    return [...this.numbers];
  }
}

export default Lotto;

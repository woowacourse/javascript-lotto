import validateLotto from "../validation/validateLotto.js";

class Lotto {
  #numbers;
  constructor(numbers) {
    this.#numbers = this.#sortLottoNumber(numbers);
    validateLotto(this.#numbers);
  }

  #sortLottoNumber(numbers) {
    return numbers.sort((a, b) => a - b);
  }

  getLottoNumbers() {
    return this.#numbers;
  }
}

export default Lotto;

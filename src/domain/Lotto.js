import LottoValidator from "./LottoValidator.js";

class Lotto {
  static NUMBERS_LENGTH = 6;
  static MIN_LOTTO_NUMBER = 1;
  static MAX_LOTTO_NUMBER = 45;

  #numbers;

  constructor(numbers) {
    LottoValidator.validateLottoNumbers(numbers);

    this.#numbers = this.#sortAscendingNumbers([...numbers]);
  }

  getNumbers() {
    return [...this.#numbers];
  }

  #sortAscendingNumbers(numbers) {
    return numbers.sort((a, b) => a - b);
  }
}

export default Lotto;

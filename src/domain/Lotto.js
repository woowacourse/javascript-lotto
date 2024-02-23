import LottoValidator from "./LottoValidator.js";
import { sortAscendingNumbers } from "../utils/sortAscendingNumbers.js";

class Lotto {
  static NUMBERS_LENGTH = 6;
  static MIN_LOTTO_NUMBER = 1;
  static MAX_LOTTO_NUMBER = 45;

  #numbers;

  constructor(numbers) {
    LottoValidator.validateLottoNumbers(numbers);

    this.#numbers = sortAscendingNumbers([...numbers]);
  }

  getNumbers() {
    return [...this.#numbers];
  }

}

export default Lotto;

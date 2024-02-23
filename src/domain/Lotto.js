import { sortAscending } from "../utils/sortAscending.js";
import LottoNumber from "./LottoNumber.js";
import {
  validateUniqueElements,
  validateLengthEqual,
} from "../utils/validator.js";

class Lotto {
  static NUMBERS_LENGTH = 6;

  #numbers = [];

  constructor(numbers = []) {
    this.#validateLottoNumbers(numbers);

    const lottoNumbers = this.#convertToLottoNumbers(sortAscending(numbers));

    this.#numbers = lottoNumbers;
  }

  getNumbers() {
    return this.#numbers.map((lottoNumber) => lottoNumber.getNumber()).slice();
  }

  #validateLottoNumbers(numbers) {
    validateLengthEqual(numbers.length, Lotto.NUMBERS_LENGTH);
    validateUniqueElements(numbers);
  }

  #convertToLottoNumbers(numbers) {
    return numbers.map((number) => new LottoNumber(number));
  }
}

export default Lotto;

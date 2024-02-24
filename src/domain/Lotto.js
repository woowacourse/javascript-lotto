import { sortAscending } from "../utils/sortAscending.js";
import LottoNumber from "./LottoNumber.js";
import {
  validateUniqueElements,
  validateLengthEqual,
} from "../utils/validator.js";

class Lotto {
  static NUMBER_COUNT = 6;

  #lottoNumbers = [];

  constructor(numbers = []) {
    this.#validateLottoNumbers(numbers);

    const lottoNumbers = this.#convertToLottoNumbers(sortAscending(numbers));

    this.#lottoNumbers = lottoNumbers;
  }

  has(lottoNumber) {
    const numbers = this.getNumbers();
    const comparedNumber = lottoNumber.getNumber();

    return numbers.includes(comparedNumber);
  }

  compare(targetLotto) {
    const numbers = this.getNumbers();
    const targetNumbers = targetLotto.getNumbers();

    const matchedCount = targetNumbers.filter((targetNumber) =>
      numbers.includes(targetNumber)
    ).length;

    return matchedCount;
  }

  getNumbers() {
    return this.#lottoNumbers
      .map((lottoNumber) => lottoNumber.getNumber())
      .slice();
  }

  #validateLottoNumbers(numbers) {
    validateLengthEqual(numbers.length, Lotto.NUMBER_COUNT);
    validateUniqueElements(numbers);
  }

  #convertToLottoNumbers(numbers) {
    return numbers.map((number) => new LottoNumber(number));
  }
}

export default Lotto;

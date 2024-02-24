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

  compare(comparedLotto) {
    const numbers = this.getNumbers();
    const comparedNumbers = comparedLotto.getNumbers();

    const matchedCount = comparedNumbers.filter((comparedNumber) =>
      numbers.includes(comparedNumber)
    ).length;

    return matchedCount;
  }

  has(lottoNumber) {
    const numbers = this.getNumbers();
    const comparedNumber = lottoNumber.getValue();

    return numbers.includes(comparedNumber);
  }

  getNumbers() {
    return this.#lottoNumbers
      .map((lottoNumber) => lottoNumber.getValue())
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

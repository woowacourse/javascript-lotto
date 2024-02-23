import CONDITION from '../../constant/Condition';
import ERROR from '../../constant/Error';
import LottoNumber from './LottoNumber';

class LottoNumberList {
  #lottoNumbers;

  constructor(numbers) {
    LottoNumberList.#validate(numbers);
    this.#lottoNumbers = numbers
      .map((num) => new LottoNumber(num))
      .sort((a, b) => a.getNumber() - b.getNumber());
  }

  static fromString(numberStrings) {
    return new LottoNumberList(numberStrings.map((numStr) => Number(numStr)));
  }

  getNumbers() {
    return this.#lottoNumbers.map((lottoNumber) => lottoNumber.getNumber());
  }

  static #validate(numbers) {
    LottoNumberList.#validateDuplication(numbers);
    LottoNumberList.#validateLength(numbers);
  }

  static #validateDuplication(numbers) {
    if (numbers.length !== new Set(numbers).size) {
      throw new Error(ERROR.beNotDuplication);
    }
  }

  static #validateLength(numbers) {
    if (numbers.length !== CONDITION.countOfNumberInTicket) {
      throw new Error(ERROR.countOfWinningNumbers);
    }
  }
}

export default LottoNumberList;

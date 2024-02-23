import CONDITION from '../../constant/Condition.js';
import ERROR from '../../constant/Error.js';
import LottoNumber from './LottoNumber.js';

class LottoNumberList {
  #lottoNumbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#lottoNumbers = numbers
      .map(num => new LottoNumber(num))
      .sort((a, b) => a.getNumber() - b.getNumber());
  }

  static fromString(numberStrings) {
    return new LottoNumberList(numberStrings.map(numStr => Number(numStr)));
  }

  getNumbers() {
    return this.#lottoNumbers.map(lottoNumber => lottoNumber.getNumber());
  }

  #validate(numbers) {
    this.#validateDuplication(numbers);
    this.#validateLength(numbers);
  }

  #validateDuplication(numbers) {
    if (numbers.length !== new Set(numbers).size) {
      throw new Error(ERROR.beNotDuplicated);
    }
  }

  #validateLength(numbers) {
    if (numbers.length !== CONDITION.countOfNumberInTicket) {
      throw new Error(ERROR.countOfWinningNumbers);
    }
  }
}

export default LottoNumberList;

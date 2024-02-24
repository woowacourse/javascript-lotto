import CONDITION from '../../constant/Condition';
import ERROR from '../../constant/Error';
import LottoNumber from './LottoNumber';

class LottoNumberList {
  #lottoNumbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#lottoNumbers = numbers
      .map(num => LottoNumber.fromString(num))
      .sort((a, b) => a.getNumber() - b.getNumber());
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

import CONDITION from '../../constant/Condition.js';
import ERROR from '../../constant/Error.js';
import LottoNumber from './LottoNumber.js';

class LottoNumberList {
  #LottoNumbers;

  constructor(numberStrings) {
    this.#validate(numberStrings);
    this.#LottoNumbers = numberStrings.map(
      numberStr => new LottoNumber(numberStr),
    );
  }

  getNumbers() {
    return this.#LottoNumbers.map(lottoNumber => lottoNumber.getNumber());
  }

  #validate(numbers) {
    this.#validateDuplication(numbers);
    this.#validateLength(numbers);
  }

  #validateDuplication(numbers) {
    if (numbers.length !== new Set(numbers).size) {
      throw new Error(ERROR.beNotDuplication);
    }
  }

  #validateLength(numbers) {
    if (numbers.length !== CONDITION.countOfNumberInTicket) {
      throw new Error(ERROR.countOfWinningNumbers);
    }
  }
}

export default LottoNumberList;

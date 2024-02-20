import ERROR from '../../constant/Error.js';
import LottoNumber from './LottoNumber.js';

class LottoTicket {
  #LottoNumbers;
  constructor(numbers) {
    this.#validateDuplication(numbers);
    this.#LottoNumbers = numbers.map(
      number => new LottoNumber(number.toString()),
    );
  }

  getNumbers() {
    return this.#LottoNumbers.map(lottoNumber => lottoNumber.getNumber());
  }

  #validateDuplication(numbers) {
    if (numbers.length !== new Set(numbers).size) {
      throw new Error(ERROR.beNotDuplication);
    }
  }
}

export default LottoTicket;

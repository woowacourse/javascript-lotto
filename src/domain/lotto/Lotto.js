import Validation from '../../Validation';

class Lotto {
  /** @type {number[]} */
  #lottoNumbers;

  /**
   * @param {number[]} lottoNumbers
   */
  constructor(lottoNumbers) {
    Validation.validateLottoNumbers(lottoNumbers);
    this.#lottoNumbers = lottoNumbers.sort((a, b) => a - b);
  }

  getLottoNumbers() {
    return this.#lottoNumbers;
  }
}

export default Lotto;

import Validation from '../../Validation';

class Lotto {
  static LENGTH = 6;

  static NUMBER_LOWER_BOUND = 1;

  static NUMBER_UPPER_BOUND = 45;

  static PRICE = 1000;

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

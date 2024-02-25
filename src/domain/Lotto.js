import LOTTO_RULE from '../constants/rules/lottoRule';
import ERROR_MESSAGE from '../constants/messages/errorMessage';

export default class Lotto {
  #lottoNumbers;

  /**
   *
   * @param {number[]} lottoNumbers
   */
  constructor(lottoNumbers) {
    this.#lottoNumbers = lottoNumbers;
    this.#validateLotto();
    this.#sortLottoNumbers();
  }

  #validateLotto() {
    this.#isInvalidLottoNumberCount();
    this.#hasRedundantLottoNumber();

    this.#lottoNumbers.forEach(lottoNumber => {
      this.#isNotNumber(lottoNumber);
      this.#isInvalidLottoNumberRange(lottoNumber);
    });
  }

  #isInvalidLottoNumberCount() {
    if (this.#lottoNumbers.length !== 6) {
      throw new Error(ERROR_MESSAGE.IS_NOT_VALID_LOTTO_NUMBER_COUNT);
    }
  }

  #hasRedundantLottoNumber() {
    if (new Set(this.#lottoNumbers).size !== 6) {
      throw new Error(ERROR_MESSAGE.HAS_REDUNDANT_LOTTO_NUMBER);
    }
  }

  #isNotNumber(lottoNumber) {
    if (isNaN(lottoNumber)) {
      throw new Error(ERROR_MESSAGE.IS_NOT_NUMBER);
    }
  }
  #isInvalidLottoNumberRange(lottoNumber) {
    if (lottoNumber > LOTTO_RULE.RANDOM_NUMBER_TO || lottoNumber < LOTTO_RULE.RANDOM_NUMBER_FROM) {
      throw new Error(ERROR_MESSAGE.IS_INVALID_LOTTO_NUMBER_RANGE);
    }
  }

  #sortLottoNumbers() {
    this.#lottoNumbers = this.#lottoNumbers.sort((a, b) => a - b);
  }

  get lottoNumbers() {
    return this.#lottoNumbers.slice();
  }
}

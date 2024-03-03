import LOTTO_RULE from '../constants/rules/lottoRule';
import ERROR_MESSAGE from '../constants/messages/errorMessage';

export default class Lotto {
  #lottoNumbers;

  constructor(lottoNumbers) {
    this.#lottoNumbers = lottoNumbers;
    this.#validateLotto();
  }

  #validateLotto() {
    this.#isValidLottoNumberCount();

    this.#lottoNumbers.forEach((lottoNumber) => {
      this.#isNotNumber(lottoNumber);
      this.#isValidLottoNumberRange(lottoNumber);
    });
    this.#hasRedundentLottoNumber();
  }

  #isValidLottoNumberCount() {
    if (this.#lottoNumbers.length !== LOTTO_RULE.LOTTO_COUNT) {
      throw new Error(ERROR_MESSAGE.IS_INVALID_LOTTO_NUMBER_COUNT);
    }
  }

  #hasRedundentLottoNumber() {
    if (new Set(this.#lottoNumbers).size !== LOTTO_RULE.LOTTO_COUNT) {
      throw new Error(ERROR_MESSAGE.HAS_REDUNDENT_LOTTO_NUMBER);
    }
  }

  #isNotNumber(lottoNumber) {
    if (Number.isNaN(lottoNumber)) {
      throw new Error(ERROR_MESSAGE.IS_NOT_NUMBER);
    }
  }

  #isValidLottoNumberRange(lottoNumber) {
    if (lottoNumber > LOTTO_RULE.RANDOM_NUMBER_TO || lottoNumber < LOTTO_RULE.RANDOM_NUMBER_FROM) {
      throw new Error(ERROR_MESSAGE.IS_INVALID_LOTTO_NUMBER_RANGE);
    }
  }

  get lottoNumbers() {
    return this.#lottoNumbers.toSorted((a, b) => a - b);
  }
}

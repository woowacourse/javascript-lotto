import generateRandomNumberInRange from '../util/generateRandomNumberInRange';
import LOTTO_RULE from '../constants/rules/lottoRule';
import ERROR_MESSAGE from '../constants/messages/errorMessage';

export default class Lotto {
  #lottoNumbers = [];

  constructor(lottoNumbers = []) {
    const needRandomGenerating = lottoNumbers.length === 0;

    needRandomGenerating ? this.#drawAutoLottoNumbers() : this.#makeCustomLottoNumbers(lottoNumbers);
    this.#validateLotto();
  }

  // TODO: validate 파일 분리?
  #validateLotto() {
    this.#isInvalidLottoNumberCount();
    this.#hasRedundentLottoNumber();

    this.#lottoNumbers.forEach((lottoNumber) => {
      this.#isNotNumber(lottoNumber);
      this.#isInvalidLottoNumberRange(lottoNumber);
    });
  }

  #isInvalidLottoNumberCount() {
    if (this.#lottoNumbers.length !== 6) {
      throw new Error(ERROR_MESSAGE.IS_INVALID_LOTTO_NUMBER_COUNT);
    }
  }

  #hasRedundentLottoNumber() {
    if (new Set(this.#lottoNumbers).size !== 6) {
      throw new Error(ERROR_MESSAGE.HAS_REDUNDENT_LOTTO_NUMBER);
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

  #makeCustomLottoNumbers(lottoNumbers) {
    const splitedLottoNumbers = lottoNumbers.split(',');
    splitedLottoNumbers.forEach((num) => {
      this.#pushNotRedundantNumber(Number(num));
    });
  }

  #drawAutoLottoNumbers() {
    while (this.#lottoNumbers.length !== 6) {
      const randomNumber = generateRandomNumberInRange();

      this.#pushNotRedundantNumber(randomNumber);
    }
  }

  #pushNotRedundantNumber(randomNumber) {
    if (!this.#lottoNumbers.includes(randomNumber)) {
      this.#lottoNumbers.push(randomNumber);
    }
  }

  get lottoNumbers() {
    return this.#lottoNumbers.toSorted((a, b) => a - b);
  }
}

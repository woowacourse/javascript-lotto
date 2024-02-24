import LOTTO_SETTING from '../Constants/lottoSetting';
import ERROR_MESSAGE from '../Constants/Messages/errorMessage';
import AppError from '../Error/AppError';

export default class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers.sort((a, b) => a - b);
    this.#validateLottoNumbers();
  }

  #validateLottoNumbers() {
    this.#validateLottoNumberRange();
    this.#validateDuplication();
    this.#validateLottoLength();
  }

  #validateLottoNumberRange() {
    if (!this.#numbers.every((number) => number >= LOTTO_SETTING.MIN_NUM && number <= LOTTO_SETTING.MAX_NUM)) {
      throw new AppError(ERROR_MESSAGE.OUT_OF_RANGE);
    }
  }

  #validateDuplication() {
    if (new Set([...this.#numbers]).size !== LOTTO_SETTING.VALID_LENGTH) {
      throw new AppError(ERROR_MESSAGE.HAVE_DUPLICATION_OF_LOTTO_NUMBER);
    }
  }

  #validateLottoLength() {
    if (this.#numbers.length !== LOTTO_SETTING.VALID_LENGTH) {
      throw new AppError(ERROR_MESSAGE.INVALID_LENGTH);
    }
  }

  getLottoNumbers() {
    return [...this.#numbers];
  }
}

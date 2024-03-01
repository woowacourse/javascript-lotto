import { ERROR_MESSAGES } from '../constants';
import {
  isNotDuplicatedLottoNumber,
  isValidLottoNumberCount,
} from '../utils/validatorsUtils';
import LottoNumber from './LottoNumber';

class Lotto {
  #numbers;

  /**
   * @param {number[]} numbers
   */
  constructor(numbers) {
    this.#validateLottoNumbers(numbers);
  }

  get numbers() {
    return [...this.#numbers];
  }

  /**
   * @param {number[]} numbers
   */
  #validateLottoNumbers(numbers) {
    const lottoNumbers = numbers.map(
      (number) => new LottoNumber(number).number,
    );

    if (!isValidLottoNumberCount(lottoNumbers))
      throw new Error(ERROR_MESSAGES.invalidLottoNumberCount);

    if (!isNotDuplicatedLottoNumber(lottoNumbers))
      throw new Error(ERROR_MESSAGES.duplicatedLottoNumber);

    this.#numbers = lottoNumbers;
  }
}

export default Lotto;

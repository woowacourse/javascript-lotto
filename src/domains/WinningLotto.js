import { ERROR_MESSAGES, NUMBER_DELIMITER } from '../constants';
import { checkDefinedInputValue, isValidWinningNumbersForm } from '../utils';
import Lotto from './Lotto';

class WinningLotto {
  /**
   * @property {number[]}
   */
  #lottoNumbers = [];

  /**
   * @param {string} lottoNumbersInput
   */
  constructor(lottoNumbersInput) {
    this.#validateWinningLottoNumbers(lottoNumbersInput);
  }

  get lottoNumbers() {
    return this.#lottoNumbers;
  }

  /**
   * @param {number[]} lottoNumbers
   * @param {Bonus} bonus
   */
  compareLotto(lottoNumbers, bonus) {
    return {
      isBonus: bonus.isMatchingNumber(lottoNumbers),
      matchedCount: this.#countMatchedNumber(lottoNumbers),
    };
  }

  /**
   *  @param {number[]} lottoNumbers
   */
  #countMatchedNumber(lottoNumbers) {
    return lottoNumbers.filter((number) => this.#lottoNumbers.includes(number))
      .length;
  }

  /**
   * @param {string} lottoNumbersInput
   */
  #validateWinningLottoNumbers(lottoNumbersInput) {
    checkDefinedInputValue(lottoNumbersInput);

    if (!isValidWinningNumbersForm(lottoNumbersInput))
      throw new Error(ERROR_MESSAGES.inValidWInningNumbersForm);

    const numbers = lottoNumbersInput
      .split(NUMBER_DELIMITER)
      .map((value) => Number(value));

    this.#lottoNumbers = new Lotto(numbers).numbers;
  }
}

export default WinningLotto;

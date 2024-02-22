import { NUMBER_DELIMITER } from '../constants';
import Validator from './Validator';

class WinningLotto {
  /**
   * @property {number[]}
   */
  #lottoNumbers = [];

  #bonusNumber = 0;

  set lottoNumbers(lottoNumbersInput) {
    Validator.checkWinningLottoNumbers(lottoNumbersInput);

    this.#lottoNumbers = lottoNumbersInput
      .split(NUMBER_DELIMITER)
      .map((lottoNumberInput) => Number(lottoNumberInput));
  }

  set bonusNumber(bonusNumberInput) {
    Validator.checkBonusNumber(this.#lottoNumbers, bonusNumberInput);
    this.#bonusNumber = Number(bonusNumberInput);
  }

  /**
   *  @param {number[]} lottoNumbers
   */
  compareLotto(lottoNumbers) {
    return {
      isBonus: this.#hasBonusNumber(lottoNumbers),
      matchedCount: this.#countMatchedNumber(lottoNumbers),
    };
  }

  /**
   * @param {number[]} lottoNumbers
   */
  #hasBonusNumber(lottoNumbers) {
    return lottoNumbers.includes(this.#bonusNumber);
  }

  /**
   *  @param {number[]} lottoNumbers
   */
  #countMatchedNumber(lottoNumbers) {
    return lottoNumbers.filter((number) => this.#lottoNumbers.includes(number))
      .length;
  }
}

export default WinningLotto;

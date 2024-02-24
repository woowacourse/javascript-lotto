import { ERROR_MESSAGES } from '../constants';
import { checkDefinedInputValue, isNotInLottoNumber } from '../utils';
import LottoNumber from './LottoNumber';

class Bonus {
  #number;

  /**
   * @param {string} bonusNumberInput
   * @param {number[]} winningLottoNumbers
   */
  constructor(bonusNumberInput, winningLottoNumbers) {
    this.#validateBonusNumber(bonusNumberInput, winningLottoNumbers);
  }

  /**
   * @param {string} bonusNumberInput
   * @param {number[]} WinningLottoNumbers
   */
  #validateBonusNumber(bonusNumberInput, winningLottoNumbers) {
    checkDefinedInputValue(bonusNumberInput);

    const { number } = new LottoNumber(Number(bonusNumberInput));

    if (!isNotInLottoNumber(winningLottoNumbers, number)) {
      throw new Error(ERROR_MESSAGES.alreadyInLottoNumber);
    }

    this.#number = new LottoNumber(number).number;
  }

  /**
   *
   * @param {number[]} lottoNumbers
   */
  isMatchingNumber(lottoNumbers) {
    return lottoNumbers.includes(this.#number);
  }
}

export default Bonus;

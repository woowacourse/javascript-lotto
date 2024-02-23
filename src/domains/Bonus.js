import { checkDefinedInputValue } from '../utils';
import LottoNumber from './LottoNumber';

class Bonus {
  #number;

  /**
   * @param {string} bonusNumberInput
   */
  constructor(bonusNumberInput) {
    this.#validateBonusNumber(bonusNumberInput);
  }

  #validateBonusNumber(bonusNumberInput) {
    checkDefinedInputValue(bonusNumberInput);

    const { number } = new LottoNumber(Number(bonusNumberInput));

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

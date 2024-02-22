import Validator from './Validator';

class WinningLotto {
  /**
   * @property {number[]}
   */
  #lottoNumbers = [];

  #bonusNumber = 0;
  /**
   * @param {string} lottoNumbersInput
   * @param {string} bonusNumberInput
   */
  constructor(lottoNumbersInput, bonusNumberInput) {
    Validator.checkWinningLottoNumbers(lottoNumbersInput);
    this.#lottoNumbers = lottoNumbersInput
      .split(',')
      .map((lottoNumberInput) => Number(lottoNumberInput));

    Validator.checkBonusNumber(this.#lottoNumbers, bonusNumberInput);
    this.#bonusNumber = Number(bonusNumberInput);
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
  /**
   *  @param {number[]} lottoNumbers
   */
  compareLotto(lottoNumbers) {
    return {
      isBonus: this.#hasBonusNumber(lottoNumbers),
      matchedCount: this.#countMatchedNumber(lottoNumbers),
    };
  }
}

export default WinningLotto;

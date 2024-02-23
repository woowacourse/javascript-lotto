import { ERROR_MESSAGE } from '../constants';
import { isInteger, isLottoNumberInRange, isNotInLottoNumber } from '../utils';

class WinningLotto {
  #lotto;

  #bonusNumber;

  /**
   * @param {Lotto} lotto
   * @param {string} bonusNumberInput
   */
  constructor(lotto, bonusNumberInput) {
    this.#lotto = lotto;

    this.#validateBonusNumber(bonusNumberInput);
    this.#bonusNumber = Number(bonusNumberInput);
  }

  /**
   *  @param {number[]} lottoNumbers
   */
  compareLotto(lottoNumbers) {
    return {
      isBonus: this.#isBonusNumber(lottoNumbers),
      matchedCount: this.#getMatchedCount(lottoNumbers),
    };
  }

  #isBonusNumber(lottoNumbers) {
    return lottoNumbers.includes(this.#bonusNumber);
  }

  #getMatchedCount(lottoNumbers) {
    return lottoNumbers.filter((lottoNumber) =>
      this.#lotto.numbers.includes(lottoNumber),
    ).length;
  }

  #validateBonusNumber(bonusNumberInput) {
    const bonusNumber = Number(bonusNumberInput);

    if (!isInteger(bonusNumber)) throw new Error(ERROR_MESSAGE.notInteger);

    if (!isLottoNumberInRange(bonusNumber))
      throw new Error(ERROR_MESSAGE.invalidLottoNumberRange);

    if (!isNotInLottoNumber(this.#lotto.numbers, bonusNumber)) {
      throw new Error(ERROR_MESSAGE.alreadyInLottoNumber);
    }
  }
}

export default WinningLotto;

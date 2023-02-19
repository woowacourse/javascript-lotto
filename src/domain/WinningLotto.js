import Validation from '../Validation';
import Lotto from './lotto/Lotto';

class WinningLotto {
  /** @type {Lotto} */
  #lotto;

  /** @type {number} */
  #bonusNumber;

  /**
   * @param {number[]} lottoNumbers
   * @param {number} bonusNumber
   */
  constructor(lottoNumbers, bonusNumber) {
    this.#lotto = new Lotto(lottoNumbers);
    this.#bonusNumber = bonusNumber;

    Validation.validateBonusNumberUnique(lottoNumbers, bonusNumber);
  }

  getLottoNumbers() {
    return this.#lotto.getLottoNumbers();
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }

  /**
   * @param {Lotto} lotto
   * @returns {number}
   */
  getMatchCount(lotto) {
    const countFn = (count, lottoNumber) =>
      lotto.getLottoNumbers().includes(lottoNumber) ? count + 1 : count;
    return this.getLottoNumbers().reduce(countFn, 0);
  }

  /**
   * @param {Lotto} lotto
   * @returns {boolean}
   */
  hasBonusNumber(lotto) {
    return lotto.getLottoNumbers().includes(this.#bonusNumber);
  }
}

export default WinningLotto;

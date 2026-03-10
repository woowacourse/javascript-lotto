import ERROR_MESSAGE from './constants/errorMessage.js';
import LottoNumber from './LottoNumber.js';

class WinningLottoAndBonusNumber {
  #winningLotto;
  #bonusNumber;

  constructor(winningLotto, bonusNumber) {
    this.#winningLotto = winningLotto;
    this.validateBonusNumber(bonusNumber);
    this.#bonusNumber = new LottoNumber(bonusNumber);
  }

  validateBonusNumber(bonusNumber) {
    if (this.#winningLotto.includes(bonusNumber)) {
      throw new Error(ERROR_MESSAGE.BONUS_NUMBER.DUPLICATE);
    }
  }

  calculateRank(userLotto) {
    const matchCount = userLotto.matchCount(this.#winningLotto);
    if (matchCount === 6) {
      return 1;
    } else if (matchCount === 5 && userLotto.includes(this.#bonusNumber)) {
      return 2;
    } else if (matchCount === 5) {
      return 3;
    } else if (matchCount === 4) {
      return 4;
    } else if (matchCount === 3) {
      return 5;
    }
    return 6;
  }
}

export default WinningLottoAndBonusNumber;

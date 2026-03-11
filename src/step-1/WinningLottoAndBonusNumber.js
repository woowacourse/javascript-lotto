import ERROR_MESSAGE from '../constants/errorMessage.js';
import LottoNumber from './LottoNumber.js';
import { RANK_RULES } from '../constants/rank.js';

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
    const hasBonusNumber = userLotto.includes(this.#bonusNumber);

    return RANK_RULES.find((rule) => {
      if (rule.hasBonusNumber) {
        return matchCount === rule.matchCount && hasBonusNumber;
      }
      return matchCount === rule.matchCount;
    })?.rank;
  }
}

export default WinningLottoAndBonusNumber;

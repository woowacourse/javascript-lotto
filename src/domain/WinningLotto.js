import LottoRank from './LottoRank';
import { ERROR_INVALID, ERROR_BONUS_DUPLICATE } from '../util/constants';
import { isValidLottoNumber } from '../validation';

class WinningLotto {
  #lotto;
  #bonusNumber;

  constructor(lotto) {
    this.#lotto = lotto;
  }

  setBonusNumber(bonusNumber) {
    if (!isValidLottoNumber(bonusNumber)) {
      throw new Error(ERROR_INVALID);
    }
    if (this.isDuplicateBonus(bonusNumber)) {
      throw new Error(ERROR_BONUS_DUPLICATE);
    }
    this.#bonusNumber = bonusNumber;
  }

  isDuplicateBonus(bonusNumber) {
    return this.#lotto.hasBonus(bonusNumber);
  }

  getWinRank(lotto) {
    const matchCount = lotto.countMatch(this.#lotto);
    const hasBonus = lotto.hasBonus(this.#bonusNumber);

    return LottoRank.getWinRank(matchCount, hasBonus);
  }
}

export default WinningLotto;

import Lotto from './Lotto';
import LottoRank from './LottoRank';

class WinningLotto {
  static ERROR_INVALID = '잘못된 입력입니다.';
  static ERROR_DUPLICATE = '보너스 번호는 당첨 번호와 중복될 수 없습니다.';

  #lotto;
  #bonusNumber;

  constructor(lotto) {
    this.#lotto = lotto;
  }

  setBonusNumber(bonusNumber) {
    if (!Lotto.isValidLottoNumber(bonusNumber)) {
      throw new Error(WinningLotto.ERROR_INVALID);
    }
    if (this.isDuplicateBonus(bonusNumber)) {
      throw new Error(WinningLotto.ERROR_DUPLICATE);
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

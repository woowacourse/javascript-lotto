import Lotto from './Lotto';
import LottoRank from './LottoRank';

class WinningLotto {
  static ERROR_BONUS_NUMBER = `보너스 번호는 ${Lotto.MIN_NUMBER}와 ${Lotto.MAX_NUMBER}사이의 번호 하나를 입력해주세요.`;
  static ERROR_DUPLICATE = '보너스 번호는 당첨 번호와 중복될 수 없습니다.';

  #lotto;
  #bonusNumber;

  constructor(lotto) {
    this.#lotto = lotto;
  }

  setBonusNumber(bonusNumber) {
    this.#validateBonusNumber(bonusNumber);

    this.#bonusNumber = bonusNumber;
  }

  #validateBonusNumber(number) {
    if (!Lotto.isLottoNumber(number)) throw new Error(WinningLotto.ERROR_BONUS_NUMBER);

    if (this.#isDuplicate(number)) throw new Error(WinningLotto.ERROR_DUPLICATE);
  }

  #isDuplicate(bonusNumber) {
    return this.#lotto.hasBonus(bonusNumber);
  }

  getWinRank(lotto) {
    const matchCount = lotto.countMatch(this.#lotto);
    const hasBonus = lotto.hasBonus(this.#bonusNumber);

    return LottoRank.getWinRank(matchCount, hasBonus);
  }
}

export default WinningLotto;

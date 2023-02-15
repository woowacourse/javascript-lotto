import { isPositiveInteger, isValidLottoNumber } from '../validation';

class WinningLotto {
  #lotto;
  #bonusNumber;

  setWinningLotto(lotto) {
    this.#lotto = lotto;
  }

  setBonusNumber(bonusNumber) {
    if (!(isPositiveInteger(bonusNumber) && isValidLottoNumber(bonusNumber))) {
      throw new Error('[ERROR]: 잘못된 입력입니다.');
    }
    if (this.#lotto.hasBonus(bonusNumber)) {
      throw new Error('[ERROR]: 중복된 보너스 번호입니다.');
    }
    this.#bonusNumber = bonusNumber;
  }

  judgePrize(lotto) {
    const matchCount = this.#lotto.countMatch(lotto);
    const hasBonus = lotto.hasBonus(this.#bonusNumber);
    if (matchCount === 6) return 1;
    if (matchCount === 5) return hasBonus ? 2 : 3;
    if (matchCount >= 3) return 8 - matchCount;
    return 0;
  }
}

export default WinningLotto;

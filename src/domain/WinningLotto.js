import { BONUS, PRIZE } from '../constants/rank';

class WinningLotto {
  #lotto;
  #bonusNumber;

  constructor(lotto, bonusNumber) {
    this.#lotto = lotto;
    this.#bonusNumber = bonusNumber;
  }

  countMatch(lotto) {
    const match = this.#lotto.countMatch(lotto);

    if (match === PRIZE.THIRD) return lotto.hasBonus(this.#bonusNumber) ? match + BONUS : match;

    return match;
  }

  getNumbers() {
    return this.#lotto.getNumbers();
  }
}

export default WinningLotto;

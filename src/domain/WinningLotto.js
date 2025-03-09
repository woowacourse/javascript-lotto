import { BONUS_NUMBER_ERROR_MESSAGE } from '../constants/errorMessage.js';
import validationCondition from '../validation/validateCondition.js';

class WinningLotto {
  #lotto;
  #bonusNumber;

  constructor(lotto, bonusNumber) {
    if (!validationCondition.isBonusRangeValid(bonusNumber)) {
      throw new Error(BONUS_NUMBER_ERROR_MESSAGE.RANGE);
    }
    if (lotto.has(bonusNumber)) {
      throw new Error(BONUS_NUMBER_ERROR_MESSAGE.DUPLICATE);
    }
    this.#lotto = lotto;

    this.#bonusNumber = bonusNumber;
  }

  has(number) {
    return this.#lotto.has(number);
  }

  isBonusMatched(lotto) {
    return lotto.has(this.#bonusNumber);
  }
}

export default WinningLotto;

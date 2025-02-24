import { BONUS_NUMBER_ERROR_MESSAGE } from "../constants/errorMessage.js";
import { LOTTO_NUMBERS } from "../constants/systemConstants.js";
import validationCondition from "../validation/validateCondition.js";
import Lotto from "./Lotto.js";

class WinningLotto {
  #lotto;
  #bonusNumber;

  constructor(numbers, bonusNumber) {
    if (!validationCondition.isBonusRangeValid(bonusNumber)) {
      throw new Error(BONUS_NUMBER_ERROR_MESSAGE.RANGE);
    }
    if (!validationCondition.isBonusDistinct(numbers, bonusNumber)) {
      throw new Error(BONUS_NUMBER_ERROR_MESSAGE.DUPLICATE);
    }
    this.#lotto = new Lotto(numbers);

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

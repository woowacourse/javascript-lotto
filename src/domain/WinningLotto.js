import { BONUS_NUMBER_ERROR_MESSAGE } from "../constants/errorMessage.js";
import Lotto from "./Lotto.js";

class WinningLotto extends Lotto {
  #bonusNumber;

  constructor(numbers, bonusNumber) {
    super(numbers);
    if (!this.#isRangeValid(bonusNumber)) {
      throw new Error(BONUS_NUMBER_ERROR_MESSAGE.RANGE);
    }
    if (!this.#isDistinct(numbers, bonusNumber)) {
      throw new Error(BONUS_NUMBER_ERROR_MESSAGE.DUPLICATE);
    }

    this.#bonusNumber = bonusNumber;
  }

  get bonusNumber() {
    return this.#bonusNumber;
  }

  #isRangeValid(bonusNumber) {
    return bonusNumber >= 1 && bonusNumber <= 45;
  }
  #isDistinct(numbers, bonusNumber) {
    return !numbers.includes(bonusNumber);
  }
}

export default WinningLotto;

import { BONUS_NUMBER_ERROR_MESSAGE } from "../constants/errorMessage.js";
import Lotto from "./Lotto.js";

class WinningLotto {
  #numbers;
  #bonusNumber;

  constructor(numbers, bonusNumber) {
    if (!this.#isRangeValid(bonusNumber)) {
      throw new Error(BONUS_NUMBER_ERROR_MESSAGE.RANGE);
    }
    this.#numbers = new Lotto(numbers);
    this.#bonusNumber = bonusNumber;
  }
  #isRangeValid(bonusNumber) {
    return bonusNumber >= 1 && bonusNumber <= 45;
  }
}

export default WinningLotto;

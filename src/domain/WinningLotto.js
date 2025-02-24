import { BONUS_NUMBER_ERROR_MESSAGE } from "../constants/errorMessage.js";
import { LOTTO_NUMBERS } from "../constants/systemConstants.js";
import Lotto from "./Lotto.js";

class WinningLotto {
  #lotto;
  #bonusNumber;

  constructor(numbers, bonusNumber) {
    if (!this.#isRangeValid(bonusNumber)) {
      throw new Error(BONUS_NUMBER_ERROR_MESSAGE.RANGE);
    }
    if (!this.#isDistinct(numbers, bonusNumber)) {
      throw new Error(BONUS_NUMBER_ERROR_MESSAGE.DUPLICATE);
    }
    this.#lotto = new Lotto(numbers);

    this.#bonusNumber = bonusNumber;
  }

  has(number) {
    return this.#lotto.has(number);
  }

  get bonusNumber() {
    return this.#bonusNumber;
  }

  #isRangeValid(bonusNumber) {
    return bonusNumber >= LOTTO_NUMBERS.MIN && bonusNumber <= LOTTO_NUMBERS.MAX;
  }
  #isDistinct(numbers, bonusNumber) {
    return !numbers.includes(bonusNumber);
  }
}

export default WinningLotto;

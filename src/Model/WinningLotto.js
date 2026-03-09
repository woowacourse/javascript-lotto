import { ERROR_MESSAGE } from "../constants.js";
import { getErrorMessage } from "../Utils.js";
import Lotto from "./Lotto.js";

class WinningLotto {
  #lotto;
  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    this.#lotto = new Lotto(winningNumbers);
    this.#validateBonusNumber(bonusNumber);

    this.#bonusNumber = bonusNumber;
  }

  #validateBonusNumber(bonusNumber) {
    if (this.#lotto.hasNumber(bonusNumber)) {
      throw new Error(getErrorMessage(ERROR_MESSAGE.BONUS_NUMBER_DUPLICATED));
    }
  }

  getMatchCount(lotto) {
    const winningNumbers = this.#lotto.getNumbers();
    const matchedNumbers = winningNumbers.filter((number) =>
      lotto.hasNumber(number),
    );

    return matchedNumbers.length;
  }

  hasBonus(lotto) {
    return lotto.hasNumber(this.#bonusNumber);
  }
}

export default WinningLotto;

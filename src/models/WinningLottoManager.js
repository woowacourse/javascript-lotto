import Lotto from "./Lotto.js";

import { ERROR_MESSAGE } from "../constants/message.js";

import { commonValidate } from "../validates/CommonValidator.js";
import { isNumberInArray } from "../validates/LottoValidator.js";

class WinningLottoManager extends Lotto {
  #winningLottos;
  #bonusNumber;

  constructor(winningLottosInput) {
    super(winningLottosInput);
    this.#winningLottos = winningLottosInput;
  }

  setBonusNumber(bonusNumberInput) {
    this.#validateBonusNumber(bonusNumberInput);
    this.#bonusNumber = Number(bonusNumberInput);
  }

  #validateBonusNumber(bonusNumber) {
    if (!commonValidate(bonusNumber)) {
      throw new Error(ERROR_MESSAGE.COMMON.INVALID_NUMBER);
    }

    if (isNumberInArray(Number(bonusNumber), this.#winningLottos)) {
      throw new Error(ERROR_MESSAGE.BONUS.DUPLICATE);
    }
  }

  compareWithWinningLotto(lottoNumbers) {
    const winningLottos = this.#winningLottos;
    const matchCount = winningLottos.filter((number) => lottoNumbers.includes(number)).length;
    const hasBonus = lottoNumbers.includes(this.#bonusNumber);

    return {
      matchCount,
      hasBonus,
    };
  }
}

export default WinningLottoManager;

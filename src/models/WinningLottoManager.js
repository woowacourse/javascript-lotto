import Lotto from "./Lotto.js";

import { ERROR_MESSAGE } from "../constants/message.js";

import { commonValidate } from "../validates/CommonValidator.js";
import { isNumberInArray } from "../validates/LottoValidator.js";

class WinningLottoManager extends Lotto {
  #bonusNumber;

  constructor(winningLottosInput) {
    // 부모 클래스인 Lotto에 숫자 배열을 전달해 내부 상태를 초기화합니다.
    super(winningLottosInput);
  }

  setBonusNumber(bonusNumberInput) {
    this.#validateBonusNumber(bonusNumberInput);
    this.#bonusNumber = Number(bonusNumberInput);
  }

  #validateBonusNumber(bonusNumber) {
    if (!commonValidate(bonusNumber)) {
      throw new Error(ERROR_MESSAGE.COMMON.INVALID_NUMBER);
    }

    // 부모의 getNumbers()를 사용해 당첨 번호 배열을 조회합니다.
    if (isNumberInArray(Number(bonusNumber), this.getNumbers())) {
      throw new Error(ERROR_MESSAGE.BONUS.DUPLICATE);
    }
  }

  compareWithWinningLotto(lottoNumbers) {
    const winningLottos = this.getNumbers();
    const matchCount = winningLottos.filter((number) => lottoNumbers.includes(number)).length;
    const hasBonus = lottoNumbers.includes(this.#bonusNumber);

    return {
      matchCount,
      hasBonus,
    };
  }
}

export default WinningLottoManager;

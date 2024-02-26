import Lotto from "./Lotto";
import Validator from "../utils/Validator";
import LOTTO_SYSTEM from "../constants/lottoSystem";
import { ERROR_MESSAGE } from "../constants/message";

class WinningLotto extends Lotto {
  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    super(winningNumbers);

    if (!this.#isValidBonusNumber(bonusNumber))
      throw new Error(ERROR_MESSAGE.invalidBonusNumber);

    this.#bonusNumber = bonusNumber;
  }

  compareWinningNumbersWithLotto(lottoNumbers) {
    return lottoNumbers.reduce((totalCount, lottoNumber) => {
      if (this._numbers.includes(lottoNumber)) return totalCount + 1;
      return totalCount;
    }, 0);
  }

  isBonusNumberMatch(lottoNumbers) {
    return lottoNumbers.includes(this.#bonusNumber);
  }

  #isValidBonusNumber(bonusNumber) {
    const bonusNumberType = "number";
    const lottoMinNumber = LOTTO_SYSTEM.lottoRangeMinimum;
    const lottoMaxNumber = LOTTO_SYSTEM.lottoRangeMaximum;

    return (
      Validator.checkArrayElementType([bonusNumber], bonusNumberType) &&
      Validator.checkArrayElementInteger([bonusNumber]) &&
      Validator.checkRangeNumbers(
        [bonusNumber],
        lottoMinNumber,
        lottoMaxNumber,
      ) &&
      Validator.checkNumberNotInArray(this._numbers, bonusNumber)
    );
  }
}

export default WinningLotto;

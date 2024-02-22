import Validator from "../utils/Validator";
import Lotto from "./Lotto";
class WinningLotto extends Lotto {
  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    super(winningNumbers);

    if (!Validator.checkBonusNumber(winningNumbers, bonusNumber))
      throw new Error();

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
}

export default WinningLotto;

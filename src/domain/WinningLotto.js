import Lotto from "./Lotto";
class WinningLotto extends Lotto {
  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    super(winningNumbers);

    this.#validateBonusNumber(bonusNumber);

    this.#bonusNumber = bonusNumber;
  }

  #validateBonusNumber(bonusNumber) {
    if (typeof bonusNumber !== "number") {
      throw new Error();
    }

    if (!Number.isInteger(bonusNumber)) {
      throw new Error();
    }

    if (bonusNumber < 1 || bonusNumber > 45) {
      throw new Error();
    }

    if (this._numbers.includes(bonusNumber)) {
      throw new Error();
    }
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

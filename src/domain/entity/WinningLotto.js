import ERROR from '../../constant/Error.js';
import LottoNumber from './LottoNumber.js';
import LottoNumberList from './LottoNumberList.js';

class WinningLotto {
  #winningLottoNumberList;
  #bonusNumber;

  constructor(winningNumbersString) {
    const winningNumberStringArray = winningNumbersString.split(',');
    this.#winningLottoNumberList = new LottoNumberList(
      winningNumberStringArray,
    );
  }

  getNumbers() {
    return this.#winningLottoNumberList.getNumbers();
  }

  getMatchCounts(lottoNumbers) {
    return [
      this.#getMatchLottoCount(lottoNumbers),
      this.#getMatchBonusNumberCount(lottoNumbers),
    ];
  }

  setBonusNumber(bonusNumberString) {
    this.validateBonusNumber(bonusNumberString);
    this.#bonusNumber = new LottoNumber(bonusNumberString);
  }

  validateBonusNumber(bonusNumberString) {
    if (
      this.#winningLottoNumberList
        .getNumbers()
        .includes(Number(bonusNumberString))
    ) {
      throw new Error(ERROR.bonusNumberDuplication);
    }
  }

  #getMatchBonusNumberCount(lottoNumbers) {
    return lottoNumbers.filter(
      lottoNumber => lottoNumber === this.#bonusNumber.getNumber(),
    ).length;
  }

  #getMatchLottoCount(lottoNumbers) {
    const winningNumbers = this.#winningLottoNumberList.getNumbers();
    return winningNumbers.filter(number => lottoNumbers.includes(number))
      .length;
  }
}
export default WinningLotto;

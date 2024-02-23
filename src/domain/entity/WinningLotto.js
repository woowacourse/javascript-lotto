import CONDITION from '../../constant/Condition';
import ERROR from '../../constant/Error';
import LottoNumber from './LottoNumber';
import Lotto from './Lotto';

class WinningLotto {
  #winningLottoNumberList;

  #bonusNumber;

  constructor(winningNumbers) {
    this.#winningLottoNumberList = new Lotto(winningNumbers);
  }

  static fromString(winningNumbersString) {
    const winningNumbers = winningNumbersString.split(',').map((num) => Number(num));
    return new WinningLotto(winningNumbers);
  }

  getNumbers() {
    return this.#winningLottoNumberList.getNumbers();
  }

  getBonusNumber() {
    return this.#bonusNumber.getNumber();
  }

  getMatchCounts(lottoNumbers) {
    const results = [this.#getMatchLottoCount(lottoNumbers).toString()];
    if (this.#isSecondPrize(lottoNumbers)) {
      results.push(this.#getMatchBonusNumberCount(lottoNumbers));
    }
    return results.join('-');
  }

  #isSecondPrize(lottoNumbers) {
    return (
      this.#getMatchLottoCount(lottoNumbers) === CONDITION.secondPrizeMatchCount &&
      this.#getMatchBonusNumberCount(lottoNumbers) === CONDITION.secondPrizeMatchBonusCount
    );
  }

  setBonusNumber(bonusNumber) {
    this.validateBonusNumber(bonusNumber);
    this.#bonusNumber = new LottoNumber(bonusNumber);
  }

  setBonusNumberString(bonusNumberString) {
    this.validateBonusNumber(Number(bonusNumberString));
    this.#bonusNumber = LottoNumber.fromString(bonusNumberString);
  }

  validateBonusNumber(bonusNumber) {
    if (this.#winningLottoNumberList.getNumbers().includes(bonusNumber)) {
      throw new Error(ERROR.bonusNumberDuplication);
    }
  }

  #getMatchBonusNumberCount(lottoNumbers) {
    return lottoNumbers.filter((lottoNumber) => lottoNumber === this.#bonusNumber.getNumber())
      .length;
  }

  #getMatchLottoCount(lottoNumbers) {
    const winningNumbers = this.#winningLottoNumberList.getNumbers();
    return winningNumbers.filter((number) => lottoNumbers.includes(number)).length;
  }
}
export default WinningLotto;

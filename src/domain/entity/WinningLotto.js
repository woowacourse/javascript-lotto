import ERROR from '../../constant/Error.js';
import LottoNumber from './LottoNumber.js';
import LottoNumberList from './LottoNumberList.js';

class WinningLotto {
  #winningLottoNumberList;
  #bonusNumber;

  constructor(winningNumbers) {
    this.#winningLottoNumberList = new LottoNumberList(winningNumbers);
  }
  static fromString(winningNumbersString) {
    const winningNumbers = winningNumbersString
      .split(',')
      .map(num => Number(num));
    return new WinningLotto(winningNumbers);
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

import LottoNumberList from './LottoNumberList.js';

class WinningLotto {
  #winningLottoNumberList;

  constructor(winningNumbersString) {
    const winningNumberStringArray = winningNumbersString.split(',');
    this.#winningLottoNumberList = new LottoNumberList(
      winningNumberStringArray,
    );
  }

  getNumbers() {
    return this.#winningLottoNumberList.getNumbers();
  }

  getMatchNumberCount(lottoNumbers) {
    const winningNumbers = this.#winningLottoNumberList.getNumbers();
    return winningNumbers.filter(number => lottoNumbers.includes(number))
      .length;
  }
}
export default WinningLotto;

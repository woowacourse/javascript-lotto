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

  getMatchNumberCount(lottoNumbers) {}
}
export default WinningLotto;

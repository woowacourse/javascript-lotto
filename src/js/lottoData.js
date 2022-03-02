import { makeLottoNumbers } from './utils/common.js';
export default class LottoData {
  #lottoList = [];
  #winningNumbers = {};

  getLottoList() {
    return this.#lottoList;
  }

  setWinningNumbers(regularNumbers, bonusNumber) {
    this.#winningNumbers = { regularNumbers, bonusNumber };
  }

  buyLotto(quantity) {
    this.#lottoList = [];
    for (let i = 0; i < quantity; i++) {
      this.#lottoList.push(makeLottoNumbers());
    }
  }

  getLottoResult() {}
}

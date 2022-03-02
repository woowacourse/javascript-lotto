import { makeLottoNumbers, getWinningResult } from './utils/common.js';
import { PRIZE_BY_RANK } from './constants.js';

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

  getLottoResult() {
    const winningResult = getWinningResult(this.#lottoList, this.#winningNumbers);

    let profit = 0;
    for (let [numbers, count] of winningResult.entries()) {
      profit += PRIZE_BY_RANK[numbers] * count;
    }
    profit = (profit / (this.#lottoList.length * 1000)) * 100;
    return [winningResult, profit];
  }
}

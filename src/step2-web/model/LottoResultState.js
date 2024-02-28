import Observable from "../abstract/Observable.js";

export default class LottoResultState extends Observable {
  #isResultModalOn = false;
  #rankResult;
  #profitRate;

  getRankResult() {
    return this.#rankResult;
  }

  getProfitRate() {
    return this.#profitRate;
  }

  getIsResultModalOn() {
    return this.#isResultModalOn;
  }

  setRankResult(rankResult) {
    this.#rankResult = rankResult;
    this.notify();
  }

  setProfitRate(profitRate) {
    this.#profitRate = profitRate;
    this.notify();
  }

  setIsResultModalOn(isResultModalOn) {
    this.#isResultModalOn = isResultModalOn;
    this.notify();
  }
}

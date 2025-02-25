import PurchaseForm from "./PurchaseForm.js";
import LottoPurchaseHistory from "./LottoPurchaseHistory.js";
import { divideByUnit } from "../utils/count.js";
import { PRICE } from "../constants/price.js";
import LottoWinningInfoForm from "./LottoWinningInfoForm.js";

export default class LottoGame {
  #target;
  #lottoTransaction;
  #winningLottoInfo;
  #show;

  constructor($target) {
    this.#target = $target;
    this.#lottoTransaction = { price: 0, lottos: [] };
    this.#winningLottoInfo = { winningNumbers: [], bonusNumber: 0 };
    this.#show = false;
    this.render();
  }

  setLottoTransaction = (newState) => {
    this.#lottoTransaction = { ...this.#lottoTransaction, ...newState };
    this.render();
  };

  setWinningLottoInfo = (newState) => {
    this.#winningLottoInfo = { ...this.#winningLottoInfo, ...newState };
    this.render();
  };

  setShow = (newState) => {
    this.#show = newState;
    this.render();
  };

  render() {
    this.#target.innerHTML = "";

    const $div = document.createElement("div");
    const $title = document.createElement("p");

    $title.innerText = "🎱 내 번호 당첨 확인 🎱";
    $title.className = "lotto-winning-result-title";
    $div.className = "lotto-winning-result-container";

    $div.appendChild($title);
    this.#target.appendChild($div);

    const countNumber = divideByUnit(PRICE.UNIT, this.#lottoTransaction.price);

    new PurchaseForm($div, this.setLottoTransaction, this.setShow);
    new LottoPurchaseHistory(
      $div,
      countNumber,
      this.#lottoTransaction.lottos,
      this.#show
    );
    new LottoWinningInfoForm($div, this.setWinningLottoInfo, this.#show);
  }
}

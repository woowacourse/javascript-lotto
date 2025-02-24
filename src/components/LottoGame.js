import PurchaseForm from "./PurchaseForm.js";
import LottoPurchaseHistory from "./LottoPurchaseHistory.js";
import LottoFactory from "../domain/LottoFactory.js";
import { divideByUnit } from "../utils/count.js";
import { PRICE } from "../constants/price.js";

export default class LottoGame {
  #target;
  #lottoTransaction;

  constructor($target) {
    this.#target = $target;
    this.#lottoTransaction = { price: 0, lottos: [] };
    this.render($target);
  }

  setLottoTransaction = (newState) => {
    this.#lottoTransaction = { ...this.#lottoTransaction, ...newState };
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
    const lottos = LottoFactory.issueLottos(countNumber);

    new PurchaseForm($div, this.setLottoTransaction);
    new LottoPurchaseHistory($div, countNumber, lottos);
  }
}

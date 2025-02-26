import { OUTPUT } from "../constants/message.js";
import LottoHistoryItem from "./LottoHistoryItem.js";
import { PRICE } from "../constants/price.js";
import { divideByUnit } from "../utils/count.js";
import lottoTransactionStore from "../store/lottoTransactionStore.js";

export default class LottoPurchaseHistory {
  #show;

  constructor($target, show) {
    this.#show = show;
    this.render($target);
  }

  render($target) {
    const $div = document.createElement("div");
    const $text = document.createElement("p");
    const $ul = document.createElement("ul");
    if (!this.#show) {
      $div.className = "hidden";
    }
    $ul.className = "lotto-history-list";

    const { lottos, price } = lottoTransactionStore.getState().lottoTransaction;

    const countNumber = divideByUnit(PRICE.UNIT, price);

    $text.innerText = `총 ${countNumber}${OUTPUT.BUY_COUNT}`;

    lottos.map((lotto) => new LottoHistoryItem($ul, lotto.getLottoNumbers()));

    $div.appendChild($text);
    $div.appendChild($ul);
    $target.appendChild($div);
  }
}

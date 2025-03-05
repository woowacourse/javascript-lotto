import { OUTPUT } from "../../constants/message.js";
import LottoHistoryItem from "./LottoHistoryItem.js";
import { PRICE } from "../../constants/price.js";
import { divideByUnit } from "../../utils/count.js";
import lottoTransactionStore from "../../store/lottoTransactionStore.js";
import customCreateElement from "../../utils/customElement.js";

export default class LottoPurchaseHistory {
  #show;

  constructor($target, show) {
    this.#show = show;
    this.render($target);
  }

  render($target) {
    const { lottos, price } = lottoTransactionStore.getState().lottoTransaction;
    const countNumber = divideByUnit(PRICE.UNIT, price);

    const $div = document.createElement("div");

    const $lottosWrap = customCreateElement({
      tagName: "div",
      className: "lotto-list-wrap",
    });
    const $text = customCreateElement({
      tagName: "p",
      text: `총 ${countNumber}${OUTPUT.BUY_COUNT}`,
    });
    const $ul = customCreateElement({
      tagName: "ul",
      className: "lotto-history-list",
    });

    if (!this.#show) {
      $div.className = "hidden";
    }

    lottos.map((lotto) => new LottoHistoryItem($ul, lotto.getLottoNumbers()));

    $div.appendChild($text);
    $lottosWrap.appendChild($ul);
    $div.appendChild($lottosWrap);
    $target.appendChild($div);
  }
}

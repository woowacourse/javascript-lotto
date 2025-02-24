import { OUTPUT } from "../constants/message.js";
import LottoHistoryItem from "./LottoHistoryItem.js";

export default class LottoPurchaseHistory {
  #countNumber;
  #lottos;

  constructor($target, countNumber, lottos) {
    this.#countNumber = countNumber;
    this.#lottos = lottos;

    this.render($target);
  }

  render($target) {
    const $div = document.createElement("div");
    const $text = document.createElement("p");
    const $ul = document.createElement("ul");
    $div.className = "hidden";
    $ul.className = "lotto-history-list";

    $text.innerText = `총 ${this.#countNumber}${OUTPUT.BUY_COUNT}`;

    this.#lottos.map(
      (lotto) => new LottoHistoryItem($ul, lotto.getLottoNumbers())
    );

    $div.appendChild($text);
    $div.appendChild($ul);
    $target.appendChild($div);
  }
}

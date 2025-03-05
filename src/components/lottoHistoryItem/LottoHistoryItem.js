import customCreateElement from "../../utils/customElement.js";

export default class LottoHistoryItem {
  #lottoNumbers;

  constructor($target, lottoNumbers) {
    this.#lottoNumbers = lottoNumbers;

    this.render($target);
  }

  render($target) {
    const $li = customCreateElement({
      tagName: "li",
      className: "lotto-history-item",
    });
    const $lottoIconText = customCreateElement({
      tagName: "span",
      className: "lotto-history-item-icon",
      text: "🎟️",
    });
    const $lottoNumbersText = customCreateElement({
      tagName: "span",
      className: "lotto-history-item-text",
      text: this.#lottoNumbers.join(", "),
    });

    $li.appendChild($lottoIconText);
    $li.appendChild($lottoNumbersText);
    $target.appendChild($li);
  }
}

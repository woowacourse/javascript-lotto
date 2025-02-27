export default class LottoHistoryItem {
  #lottoNumbers;

  constructor($target, lottoNumbers) {
    this.#lottoNumbers = lottoNumbers;

    this.render($target);
  }

  render($target) {
    const $li = document.createElement("li");
    $li.className = "lotto-history-item";

    const $lottoIconText = document.createElement("span");
    const $lottoNumbersText = document.createElement("span");

    $lottoIconText.className = "lotto-history-item-icon";
    $lottoIconText.textContent = "🎟️";

    $lottoNumbersText.className = "lotto-history-item-text";
    $lottoNumbersText.textContent = this.#lottoNumbers.join(", ");

    $li.appendChild($lottoIconText);
    $li.appendChild($lottoNumbersText);
    $target.appendChild($li);
  }
}

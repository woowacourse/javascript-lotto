export default class LottoHistoryItem {
  #lottoNumbers;

  constructor($target, lottoNumbers) {
    this.#lottoNumbers = lottoNumbers;

    this.render($target);
  }

  render($target) {
    const $li = document.createElement("li");
    $li.className = "lotto-history-item";
    $li.innerHTML = `
        <span class="lotto-history-item-icon">🎟️</span>
        <span class="lotto-history-item-text">${this.#lottoNumbers.join(
          ", "
        )}</span>
    `;

    $target.appendChild($li);
  }
}

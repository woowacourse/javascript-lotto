export default class LottoHistoryItem {
  #lottoNumbers;

  constructor($target, lottoNumbers) {
    this.#lottoNumbers = lottoNumbers;

    this.render($target);
  }

  render($target) {
    const $li = document.createElement("li");
    $li.className = "lotto-history-item";
    // TODO: 복권 아이콘 이미지로 변경하기
    $li.innerHTML = `
        <span class="lotto-history-item-icon">🎟️</span>
        <span class="lotto-history-item-text">${this.#lottoNumbers.join(
          ", "
        )}</span>
    `;

    $target.appendChild($li);
  }
}

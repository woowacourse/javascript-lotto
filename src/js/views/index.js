class LottoGameView {
  constructor() {
    this.#initializeDOM();
  }
  #initializeDOM() {
    this.$purchasedMessage = document.querySelector('#purchased-message');
    this.$lottoContainer = document.querySelector('#lotto-container');
  }

  renderLottoList(lottoList) {
    this.$lottoContainer.innerHTML = lottoList
      .map((lotto) => this.generateLottoTemplate(lotto))
      .join('');
  }

  generateLottoTemplate({ lottoNumbers }) {
    return `<div class="lotto">
      <span>🎟️</span>
      <span class="number">${lottoNumbers.join(', ')}</span>
      </div>`;
  }
}
export default LottoGameView;

class LottoGameView {
  constructor() {
    this.#initializeDOM();
  }
  #initializeDOM() {
    this.$purchasedMessage = document.querySelector('#purchased-message');
    this.$lottoContainer = document.querySelector('#lotto-container');
  }

  renderLottoSection(lottoList) {
    this.renderPurchasedMessage(lottoList.length);
    this.renderLottoList(lottoList);
  }

  renderLottoList(lottoList) {
    this.$lottoContainer.innerHTML = lottoList
      .map((lotto) => this.generateLottoTemplate(lotto))
      .join('');
  }

  renderPurchasedMessage(length) {
    console.log(length);
    this.$purchasedMessage.innerText = `총 ${length}개를 구매하였습니다.`;
  }

  generateLottoTemplate({ lottoNumbers }) {
    return `<div class="lotto">
      <span>🎟️</span>
      <span class="number">${lottoNumbers.join(', ')}</span>
      </div>`;
  }

  renderAlignState(alignState) {
    this.$lottoContainer.setAttribute('data-align', alignState);
  }
}
export default LottoGameView;

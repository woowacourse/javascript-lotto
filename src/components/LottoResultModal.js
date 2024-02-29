import './LottoResultModal.css';
import './LottoResultTable.js';

const LOTTO_RESULT_MODAL = (rateOfReturn) => `
  <div class="lotto-result">
    <div class="close-modal-icon">X</div>
    <div class="lotto-subtitle-container">
      <h2 class="lotto-subtitle">🏆 당첨 통계 🏆</h2>
    </div>
    <lotto-result-table></lotto-result-table>
    <div class="rate-of-return">당신의 총 수익률은 ${rateOfReturn}%입니다.</div>
    <lotto-button id="retry-button"></lotto-button>
  </div>
`;

class LottoResultModal extends HTMLElement {
  connectedCallback() {
    this.render();
    this.#setEventListener();
  }

  render() {
    const app = document.querySelector('lotto-app');
    const { rateOfReturn } = app.controller().getLottoGameInfo();
    this.innerHTML = LOTTO_RESULT_MODAL(rateOfReturn);

    const retryButton = this.querySelector('#retry-button');
    retryButton.setIsDisabled(false);
    retryButton.setText('다시 시작하기');
  }

  #setEventListener() {
    this.#setModalCloseListener();
    this.#setRetryListener();
  }

  #setRetryListener() {
    const retryButton = this.querySelector('#retry-button');
    retryButton.addEventListener('click', () => {
      const app = document.querySelector('lotto-app');
      app.connectedCallback();
    });
  }

  #setModalCloseListener() {
    const closeButton = this.querySelector('.close-modal-icon');
    closeButton.addEventListener('click', () => {
      this.remove();
    });
  }
}

customElements.define('lotto-result-modal', LottoResultModal);

export default LottoResultModal;

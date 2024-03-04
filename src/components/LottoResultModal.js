import './LottoResultModal.css';
import './LottoResultTable.js';

const LOTTO_RESULT_MODAL = (rateOfReturn) => `
  <section class="lotto-result">
    <div class="close-modal-icon">X</div>
    <h1 class="lotto-subtitle">🏆 당첨 통계 🏆</h1>
    <lotto-result-table></lotto-result-table>
    <p class="rate-of-return">당신의 총 수익률은 ${rateOfReturn}%입니다.</p>
    <lotto-button id="retry-button"></lotto-button>
  </section>
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
    this.#setEnterListener();
  }

  #setRetryListener() {
    const retryButton = this.querySelector('#retry-button');
    retryButton.addEventListener('click', () => {
      const app = document.querySelector('lotto-app');
      app.connectedCallback();
    });
  }

  #setEnterListener() {
    this.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        const app = document.querySelector('lotto-app');
        app.connectedCallback();
      }
    });
  }

  #setModalCloseListener() {
    const closeButton = this.querySelector('.close-modal-icon');
    closeButton.addEventListener('click', () => {
      this.remove();
    });
    this.#setEventPropagation();
    this.addEventListener('click', () => {
      this.remove();
    });
  }

  #setEventPropagation() {
    const lottoResult = this.querySelector('.lotto-result');
    lottoResult.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  }
}

customElements.define('lotto-result-modal', LottoResultModal);

export default LottoResultModal;

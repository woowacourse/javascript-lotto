import './LottoResultModal.css';
import './LottoResultTable.js';

const LOTTO_RESULT_MODAL = `
<div class="lotto-result">
<div class="close-modal-icon">X</div>
    <div class="lotto-subtitle-container">
      <h2 class="lotto-subtitle">🏆 당첨 통계 🏆</h2>
    </div>
    <lotto-result-table></lotto-result-table>
    <div class="rate-of-return">당신의 총 수익률은 %입니다.</div>
    <lotto-button id="retry-button"></lotto-button>
  </div>
`;

class LottoResultModal extends HTMLElement {
  connectedCallback() {
    this.render();
    this.#setEventListener();
  }

  render() {
    this.innerHTML = LOTTO_RESULT_MODAL;
    const retryButton = this.querySelector('#retry-button');
    retryButton.setText('다시 시작하기');
  }

  #setEventListener() {
    const retryButton = this.querySelector('#retry-button');
    retryButton.addEventListener('click', () => {
      console.log('다시 시작해보자고');
    });
    const closeButton = this.querySelector('.close-modal-icon');
    closeButton.addEventListener('click', () => {
      console.log('닫을거야');
    });
  }
}

customElements.define('lotto-result-modal', LottoResultModal);

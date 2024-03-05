import { $ } from '../../util/domSelector';
import { RANKING } from '../../../constant/setting';
import styles from './ResultModal.module.css';

class ResultModal extends HTMLElement {
  #boundHandleShowResultModal;
  #elements;

  constructor() {
    super();
    this.#boundHandleShowResultModal = this.#handleShowResultModal.bind(this);
    this.#elements = { app: $('lotto-game-app') };
  }

  connectedCallback() {
    this.#elements.app.addEventListener('showResultModal', this.#boundHandleShowResultModal);
    this.addEventListener('click', this.#handleBackgroundClick.bind(this));
  }

  disconnectedCallback() {
    this.#elements.app.removeEventListener('showResultModal', this.#boundHandleShowResultModal);
  }

  #handleShowResultModal(event) {
    const { winningResult, profitRate } = event.detail;
    const winningResultList = this.#createWinningResultList(winningResult).join('');
    this.#showResultModal({ winningResultList, profitRate });
  }

  #handleRestart() {
    this.dispatchEvent(new CustomEvent('restartGame'));
    this.#closeModal();
  }

  #handleBackgroundClick(event) {
    const dialog = $('#result-modal', this);
    if (dialog && event.target === dialog) {
      this.#closeModal();
    }
  }

  #showResultModal({ winningResultList, profitRate }) {
    this.#render(winningResultList, profitRate);
    this.#bindElements();
    this.#elements.closeModalButton.addEventListener('click', this.#closeModal.bind(this));
    this.#elements.restartButton.addEventListener('click', this.#handleRestart.bind(this));
    this.#elements.modal.showModal();
  }

  #bindElements() {
    this.#elements = {
      ...this.#elements,
      modal: $('#result-modal', this),
      closeModalButton: $('#close-modal-button', this),
      restartButton: $('#restart-button', this),
    };
  }

  #closeModal() {
    this.#elements.modal.close();
    this.#clearModalContent();
  }

  #createWinningResultList(winningResult) {
    return Object.entries(winningResult)
      .reverse()
      .map(
        ([rank, winningCount]) => `
        <tr>
          <td>${RANKING[rank].MATCHING_COUNT}개${rank === RANKING.SECOND.NAME ? '+보너스볼' : ''}</td>
          <td>${RANKING[rank].REWARD.toLocaleString()}</td>
          <td>${winningCount}개</td>
        </tr>
      `,
      );
  }

  #createCloseModalButton() {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
        <path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"/>
      </svg>
    `;
  }

  #clearModalContent() {
    this.innerHTML = ``;
  }

  #render(winningResultList, profitRate) {
    this.innerHTML = `
      <dialog id="result-modal" class="${styles['result-modal']}">
        <div class="${styles['result-modal-box']}">
          <div id="close-modal-button" class="${styles['close-modal-button']}">
            ${this.#createCloseModalButton()}
          </div>
          <h2>🏆 당첨 통계 🏆</h2>
          <table>
            <thead>
              <tr>
                <th>일치 갯수</th>
                <th>당첨금</th>
                <th>당첨 갯수</th>
              </tr>
            </thead>
            <tbody>
              ${winningResultList}
            </tbody>
          </table>
          <p class="${styles['profit-rate-text']}">
            당신의 총 수익률은 ${profitRate}%입니다.
          </p>
          <button id="restart-button" class="${styles['restart-button']}" type="button">다시 시작하기</button>
        </div>
      </dialog>
    `;
  }
}

customElements.define('result-modal', ResultModal);

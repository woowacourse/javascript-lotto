import { $ } from '../../util/domSelector';
import { RANKING } from '../../constant/setting';

class ResultModal extends HTMLElement {
  connectedCallback() {
    $('lotto-game-app').addEventListener('winningResult', this.#handleWinningResult.bind(this));
    this.addEventListener('click', this.#handleBackgroundClick.bind(this));
  }

  #handleWinningResult(event) {
    const { winningResult, profitRate } = event.detail;
    const winningResultList = this.#createWinningResultList(winningResult).join('');
    this.#showModal({ winningResultList, profitRate });
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

  #showModal({ winningResultList, profitRate }) {
    this.#render(winningResultList, profitRate);
    $('#close-modal-button', this).addEventListener('click', this.#closeModal.bind(this));
    $('#restart-button', this).addEventListener('click', this.#handleRestart.bind(this));
    $('#result-modal', this).showModal();
  }

  #closeModal() {
    $('#result-modal', this).close();
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
      <dialog id="result-modal">
        <div id="result-modal-box">
          <div id="close-modal-button">
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
          <p id="profit-rate-text">
            당신의 총 수익률은 ${profitRate}%입니다.
          </p>
          <button id="restart-button" type="button">다시 시작하기</button>
        </div>
      </dialog>
    `;
  }
}

customElements.define('result-modal', ResultModal);

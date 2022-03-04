import { $ } from '../utils/index.js';
import { WINNING_CRITERIA, PRIZE_MONEY } from '../constant/index.js';

const getWinningStatisticModalTempalte = (winningCounts, earningsRate) => {
  return `
  <div id="winning-statistic-modal">
    <div id="winning-statistic-modal-content">
        <button id="winning-statistic-modal-close-button">X</button>
        <p id="winning-statistic-modal-title">🏆당첨 통계🏆</p>
        <div id="winning-result-container">
          <div class="winning-result-item">일치 갯수</div>
          <div class="winning-result-item">당첨금</div>
          <div class="winning-result-item">당첨 갯수</div>
          ${winningCounts
            .map(
              (winningCount, index) => `
              <div class="winning-result-item">${WINNING_CRITERIA[index]}</div>
              <div class="winning-result-item">${new Intl.NumberFormat().format(
                PRIZE_MONEY[index],
              )}</div>
              <div class="winning-result-item">${winningCount}개</div>
            `,
            )
            .join('')}
        </div>
        <p id="rate-of-return-text">당신의 총 수익률은 ${earningsRate}%입니다.</p>
        <button id="restart-button" class="lotto-app-button">다시 시작하기</button>
    </div>
  </div>
  `;
};

class WinningStatisticModalView {
  #app;

  #winningStatisticModal = null;

  #winningStatisticModalCloseButton = null;

  #restartButton = null;

  #handleRestartButton = null;

  constructor() {
    this.#app = $('#app');
  }

  renderWinningStatisticModal(winningCounts, earningsRate) {
    this.#removeWinningStatisticModal();

    const winningStatisticModalTemplate = getWinningStatisticModalTempalte(
      winningCounts,
      earningsRate,
    );

    this.#app.insertAdjacentHTML('beforeend', winningStatisticModalTemplate);

    this.#winningStatisticModal = $('#winning-statistic-modal');
    this.#winningStatisticModalCloseButton = $('#winning-statistic-modal-close-button');
    this.#restartButton = $('#restart-button');
  }

  setOnClickModalCloseButtonHandler() {
    this.#winningStatisticModalCloseButton?.addEventListener(
      'click',
      this.#removeWinningStatisticModal.bind(this),
    );
  }

  setOnClickRestartButtonHandler(callback) {
    this.#handleRestartButton = () => {
      callback();
    };

    this.#restartButton?.addEventListener('click', this.#handleRestartButton);
  }

  reset() {
    this.#removeWinningStatisticModal();
  }

  #removeWinningStatisticModal() {
    if (this.#isNotFoundedWinningStatisticModal()) {
      return;
    }

    this.#app.removeChild(this.#winningStatisticModal);
    this.#winningStatisticModal = null;
    this.#winningStatisticModalCloseButton = null;
    this.#restartButton = null;
  }

  #isNotFoundedWinningStatisticModal() {
    return this.#winningStatisticModal === null;
  }
}

export default WinningStatisticModalView;

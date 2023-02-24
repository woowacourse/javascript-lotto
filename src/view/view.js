import {
  message,
  LOTTO_NUMBER_COUNT,
  profitByRank,
  correctCountPerRankForRender,
  indexToRankKeyConverter,
} from '../constants/constants';
import utils from '../utils';

const $priceInput = document.getElementById('priceInput');
const $purchaseResultContainer = document.getElementById('resultContainer');
const $purchaseResultHeader = document.getElementById('purchaseResultHeader');
const $purchasedLottosContainer = document.getElementById(
  'purchasedLottosContainer'
);
const $winningInputForm = document.getElementById('winningInputForm');
const $winningInputFlexBox = document.getElementById('winningInputContainer');
const $bonusInputFlexBox = document.getElementById('bonusInputContainer');
const $statisticsContainer = document.getElementById('statisticsContainer');
const $resultModalContainer = document.getElementById('resultModalContainer');
const $profitRateViewer = document.getElementById('profitRate');

const view = {
  renderPurchasedLottos(lottos) {
    $purchaseResultContainer.classList = '';
    $purchaseResultHeader.innerHTML = message.showLottoCount(lottos.length);

    $purchasedLottosContainer.innerHTML = `${lottos
      .map((lotto) => `<li>🎟️ <span>${lotto.getNumbers()}</li></span>`)
      .join('')}`;
  },

  renderWinningNumbersInput() {
    $winningInputFlexBox.innerHTML = `
        <input
          class="winningInput"
          type="number"
          max="45"
          min="1"
          required
        />
      `.repeat(LOTTO_NUMBER_COUNT);

    $bonusInputFlexBox.innerHTML = `
        <input
          class="winningInput"
          type="number"
          max="45"
          min="1"
          required
        />`;

    $winningInputForm.classList = '';
  },

  renderStatistics(rankCounts, profitRate) {
    $resultModalContainer.style.display = 'flex';

    $statisticsContainer.innerHTML = `
        ${rankCounts
          .map(
            (rankCount, index) => `
              <div class="statisticsRow">
                <span class="statisticsColumn">${
                  correctCountPerRankForRender[
                    indexToRankKeyConverter[profitByRank.length - index - 1]
                  ]
                }</span>
                <span class="statisticsColumn">${utils.getFormattedNumber(
                  profitByRank[profitByRank.length - index - 1]
                )}원</span>
                <span class="statisticsColumn">${rankCount}개</span>
              </div>
            `
          )
          .join('')}
      `;

    $profitRateViewer.innerHTML = `당신의 총 수익률은 ${profitRate}%입니다.`;
  },

  closeModal() {
    $resultModalContainer.style.display = 'none';
  },

  restart() {
    $purchaseResultContainer.classList = 'hidden';
    $winningInputForm.classList = 'hidden';
    $priceInput.value = '';

    this.closeModal();
  },
};

export default view;

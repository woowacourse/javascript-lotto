const {
  message,
  LOTTO_NUMBER_COUNT,
  profitByRank,
  correctCountPerRankForRender,
  regex,
  indexToRankKeyConverter,
} = require('../constants/constants');

const priceInput = document.getElementById('priceInput');
const purchaseResultContainer = document.getElementById('resultContainer');
const purchaseResultHeader = document.getElementById('purchaseResultHeader');
const purchasedLottosContainer = document.getElementById(
  'purchasedLottosContainer'
);
const winningInputForm = document.getElementById('winningInputForm');
const winningInputFlexBox = document.getElementById('winningInputContainer');
const winningInputs = document.getElementsByClassName('winningInput');
const statisticsContainer = document.getElementById('statisticsContainer');
const resultModalContainer = document.getElementById('resultModalContainer');
const profitRateViewer = document.getElementById('profitRate');

const outputView = {
  renderPurchasedLottos(lottos) {
    purchaseResultContainer.classList = '';
    purchaseResultHeader.innerHTML = message.showLottoCount(lottos.length);

    purchasedLottosContainer.innerHTML = `${lottos
      .map((lotto) => `<li>🎟️ <span>${lotto.getNumbers()}</li></span>`)
      .join('')}`;
  },

  renderWinningNumbersInput() {
    winningInputForm.classList = '';

    winningInputFlexBox.innerHTML = `
      <input
        class="winningInput"
        type="number"
        max="45"
        min="1"
        required
      />
    `.repeat(LOTTO_NUMBER_COUNT);
  },

  renderStatistics(rankCounts, profitRate) {
    resultModalContainer.style.display = 'flex';

    statisticsContainer.innerHTML = `
      ${rankCounts
        .map(
          (rankCount, index) => `
            <div class="statisticsRow">
              <span class="statisticsColumn">${
                correctCountPerRankForRender[
                  indexToRankKeyConverter[profitByRank.length - index - 1]
                ]
              }</span>
              <span class="statisticsColumn">${profitByRank[
                profitByRank.length - index - 1
              ]
                .toString()
                .replace(regex.PRICE_FORMAT, ',')}원</span>
              <span class="statisticsColumn">${rankCount}</span>
            </div>
          `
        )
        .join('')}
    `;

    profitRateViewer.innerHTML = `당신의 총 수익률은 ${profitRate}%입니다.`;
  },

  closeModal() {
    resultModalContainer.style.display = 'none';
  },

  restart() {
    purchaseResultContainer.classList = 'hidden';
    winningInputForm.classList = 'hidden';
    priceInput.value = '';

    Array.from(winningInputs).forEach((input) => {
      // eslint-disable-next-line no-param-reassign
      input.value = '';
    });

    this.closeModal();
  },
};

module.exports = outputView;

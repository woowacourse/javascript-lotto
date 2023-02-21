const { message, LOTTO_NUMBER_COUNT } = require('../constants/constants');

const purchaseResultContainer = document.getElementById('resultContainer');
const purchaseResultHeader = document.getElementById('purchaseResultHeader');
const purchasedLottosContainer = document.getElementById(
  'purchasedLottosContainer'
);
const winningInputForm = document.getElementById('winningInputForm');
const winningInputFlexBox = document.getElementById('winningInputContainer');

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
};

module.exports = outputView;

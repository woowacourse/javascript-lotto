const { message } = require('../constants/constants');

const purchaseResultContainer = document.getElementById('resultContainer');
const purchaseResultHeader = document.getElementById('purchaseResultHeader');
const purchasedLottosContainer = document.getElementById(
  'purchasedLottosContainer'
);
const winningInputContainer = document.getElementById('winningInputContainer');

const outputView = {
  renderPurchasedLottos(lottos) {
    purchaseResultContainer.classList = '';
    purchaseResultHeader.innerHTML = message.showLottoCount(lottos.length);

    purchasedLottosContainer.innerHTML = `${lottos
      .map((lotto) => `<li>🎟️ <span>${lotto.getNumbers()}</li></span>`)
      .join('')}`;
  },

  renderWinningNumbersInput() {
    winningInputContainer.classList = '';
  },
};

module.exports = outputView;

const LottoPurchasePage = require('../components/LottoPurchasePage.js');
const resultModalPage = require('../components/resultModalPage.js');
const { moneyInputButton, resultButton } = require('../utils/DOM.js');

class LottoGameController {
  constructor() {
    this.lottoPurchasePage = new LottoPurchasePage();
    this.resultModalPage = new resultModalPage();
    this.buttonEvents();
  }

  buttonEvents() {
    moneyInputButton.addEventListener('submit', event => {
      event.preventDefault();
      this.lottoPurchasePage.purchaseButton();
    });
    resultButton.addEventListener('click', () => {
      const lottoList = this.lottoPurchasePage.lottoNumbers();
      this.resultModalPage.openModalButton(lottoList);
    });
  }
}

module.exports = LottoGameController;

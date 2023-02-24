const LottoPurchase = require('../components/LottoPurchase.js');
const { $ } = require('../utils/DOM.js');

class LottoGameController {
  constructor() {
    this.lottoPurchase = new LottoPurchase();
    this.buttonEvents();
  }

  buttonEvents() {
    $('.purchase-amount-form').addEventListener('submit', event => {
      event.preventDefault();
      this.lottoPurchase.purchaseButton();
    });
  }
}

module.exports = LottoGameController;

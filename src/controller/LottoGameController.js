const { $, $$ } = require('../utils/DOM.js');

class LottoGameController {
  constructor() {
    this.money = 0;
    this.buttonEvents();
  }

  buttonEvents() {
    $('.purchase-amount-form').addEventListener('submit', event => {
      event.preventDefault();
      this.purchaseButton();
    });
  }

  purchaseButton() {
    this.money = $('.purchase-amount-input').value;
    console.log(this.money);
  }
}

module.exports = LottoGameController;

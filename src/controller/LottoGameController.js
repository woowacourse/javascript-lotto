const LottoMachine = require('../domain/LottoMachine.js');
const display = require('../view/display.js');
const { $, $$ } = require('../utils/DOM.js');

class LottoGameController {
  constructor() {
    this.money = 0;
    this.buyLottoCount = 0;
    this.lottoMachine = new LottoMachine();
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
    this.lottoCount(this.money);
  }

  lottoCount(money) {
    this.buyLottoCount = this.lottoMachine.countLotto(money);
    display.showBuyLottoCount(this.buyLottoCount);
  }
}

module.exports = LottoGameController;

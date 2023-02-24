const LottoMachine = require('../domain/LottoMachine');
const display = require('../view/display.js');
const { $ } = require('../utils/DOM.js');

class LottoPurchase {
  constructor() {
    this.lottoMachine = new LottoMachine();
  }
  purchaseButton() {
    money = $('.purchase-amount-input').value;
    this.handleLottoCount(money);
  }

  handleLottoCount(money) {
    buyLottoCount = this.lottoMachine.countLotto(money);
    display.showBuyLottoCount(buyLottoCount);
    this.handleLottoNumbers(buyLottoCount);
  }

  handleLottoNumbers(count) {
    this.lottoMachine.makeLotto(count);
    const randomLottoNumbers = this.lottoMachine.lottoNumber;
    randomLottoNumbers.forEach(numbers => {
      display.showlottoNumbers(numbers);
    });
  }
}

module.exports = LottoPurchase;

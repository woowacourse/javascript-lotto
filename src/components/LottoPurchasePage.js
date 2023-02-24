const LottoMachine = require('../domain/LottoMachine');
const display = require('../view/display.js');
const { lottoInput } = require('../utils/DOM.js');

class LottoPurchasePage {
  money;
  constructor() {
    this.money = 0;
    this.lottoMachine = new LottoMachine();
  }
  purchaseButton() {
    money = lottoInput.value;
    this.handleLottoCount(money);
    display.showWinningNumberForm();
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

module.exports = LottoPurchasePage;

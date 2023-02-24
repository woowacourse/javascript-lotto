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
    this.money = lottoInput.value;
    this.handleLottoCount(this.money);
    display.showWinningNumberForm();
  }

  handleLottoCount(money) {
    const buyLottoCount = this.lottoMachine.countLotto(money);
    display.showBuyLottoCount(buyLottoCount);
    this.handleLottoNumbers();
  }

  handleLottoNumbers() {
    this.lottoMachine.makeLotto(this.money);
    const randomLottoNumbers = this.lottoMachine.lottoNumber;
    randomLottoNumbers.forEach(numbers => {
      display.showlottoNumbers(numbers);
    });
  }

  lottoNumbers() {
    return this.lottoMachine.lottoNumber;
  }
}

module.exports = LottoPurchasePage;

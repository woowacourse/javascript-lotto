import LottoMachine from '../domain/LottoMachine.js';
import { display } from '../view/display.js';
import { lottoInput } from '../utils/DOM.js';
import { thousandValidate, maximumMoneyValidate } from '../utils/validation.js';

export default class LottoPurchasePage {
  money;
  constructor() {
    this.money = 0;
    this.lottoMachine = new LottoMachine();
  }
  purchaseButton() {
    if (thousandValidate(lottoInput.value) || maximumMoneyValidate(lottoInput.value)) {
      display.validateAlert();
      return (lottoInput.value = '');
    }
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

  inputMoney() {
    return this.money;
  }
}

import { View } from '../view/View.js';
import { LottoGame } from '../model/LottoGame.js';

export class Controller {
  constructor() {
    this.view = new View();
    this.lottoGame = new LottoGame();
    this.purchaseLotto();
  }
  purchaseLotto() {
    this.view.purchaseBtn.addEventListener('click', (e) => {
      this.lottoGame.insertMoney(Number(this.view.moneyInput.value));
      this.lottoGame.buyLotto();
      this.clearMoneyInput();
    });
  }

  clearMoneyInput() {
    this.view.moneyInput.value = '';
    this.view.moneyInput.focus();
  }
}

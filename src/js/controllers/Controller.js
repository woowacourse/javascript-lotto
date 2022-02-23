import { View } from '../view/View.js';
import { LottoGame } from '../model/LottoGame.js';
import { validator } from '../utils.js';

export class Controller {
  constructor() {
    this.view = new View();
    this.lottoGame = new LottoGame();
    this.purchaseLotto();
  }

  purchaseLotto() {
    this.view.purchaseBtn.addEventListener('click', (e) => {
      e.preventDefault();

      if (this.detectInvalidInput()) {
        return;
      }

      this.lottoGame.insertMoney(Number(this.view.moneyInput.value));
      this.lottoGame.buyLotto();

      this.view.clearMoneyInput();
      this.view.showLottoStatusContainer();
      this.view.showWinningLottoContainer();
      this.view.showLottoIcons(this.lottoGame.lottoWallet);

      this.bindToggleEvent();
    });
  }

  bindToggleEvent() {
    this.view.toggleBtn.addEventListener('click', () => {
      if (this.view.toggleBtn.checked) {
        this.view.lottosToggleOn(this.lottoGame.lottoWallet);
        return;
      }
      this.view.lottosToggleOff(this.lottoGame.lottoWallet);
    });
  }

  detectInvalidInput() {
    try {
      validator.isInputValid(Number(this.view.moneyInput.value));
    } catch (err) {
      this.view.clearMoneyInput();
      return true;
    }
    return false;
  }
}

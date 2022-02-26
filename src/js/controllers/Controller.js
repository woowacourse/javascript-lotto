import { View } from '../view/View.js';
import { LottoGame } from '../model/LottoGame.js';
import { validator } from '../utils.js';

export class Controller {
  constructor() {
    this.view = new View();
    this.lottoGame = new LottoGame();
    this.bindPurchaseEventHandler();
  }

  bindPurchaseEventHandler() {
    this.view.purchaseBtn.addEventListener(
      'click',
      this.#purchaseLotto.bind(this)
    );
  }

  bindToggleEvent() {
    this.view.toggleBtn.addEventListener(
      'click',
      this.#controllToggleBtn.bind(this)
    );
  }

  #purchaseLotto(e) {
    try {
      e.preventDefault();
      validator.isInputValid(Number(this.view.moneyInput.value));

      this.lottoGame.insertMoney(Number(this.view.moneyInput.value));
      this.lottoGame.buyLotto();

      this.view.uncheckToggleSwitch();
      this.view.clearMoneyInput();
      this.view.showLottoStatusContainer();
      this.view.showWinningLottoContainer();
      this.view.showPurchasedLottos(this.lottoGame.lottoWallet);

      this.bindToggleEvent();
    } catch (err) {
      this.view.clearMoneyInput();
      alert(err);
    }
  }

  #controllToggleBtn() {
    if (this.view.toggleBtn.checked) {
      this.view.lottosToggleOn(this.lottoGame.lottoWallet);
      return;
    }
    this.view.lottosToggleOff(this.lottoGame.lottoWallet);
  }
}

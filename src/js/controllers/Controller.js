import { View } from '../view/View.js';
import { LottoGame } from '../model/LottoGame.js';
import { validator } from '../utils.js';
import { CONDITIONS } from '../constants/constants.js';

export class Controller {
  constructor() {
    this.view = new View();
    this.lottoGame = new LottoGame();
    this.bindPurchaseEvent();
    this.bindToggleEvent();
  }

  bindPurchaseEvent() {
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
      this.view.showLottoStatusContainer();
      this.view.showWinningLottoContainer();
      this.view.showPurchasedLottos(this.lottoGame.lottoWallet);
    } catch (err) {
      alert(err);
    }
    this.view.clearMoneyInput(
      this.lottoGame.moneyInput % CONDITIONS.LOTTO_PRICE
    );
  }

  #controllToggleBtn() {
    if (this.view.toggleBtn.checked) {
      this.view.lottosToggleOn(this.lottoGame.lottoWallet);
      return;
    }
    this.view.lottosToggleOff(this.lottoGame.lottoWallet);
  }
}

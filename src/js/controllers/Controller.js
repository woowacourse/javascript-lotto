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
    this.bindShowResultEvent();
    this.bindCloseModalBtn();
  }

  bindPurchaseEvent() {
    this.view.purchaseBtn.addEventListener('click', this.#purchaseLotto.bind(this));
  }

  bindToggleEvent() {
    this.view.toggleBtn.addEventListener('click', this.#controllToggleBtn.bind(this));
  }

  bindShowResultEvent() {
    this.view.showResultBtn.addEventListener('click', this.#showLottoResult.bind(this));
  }

  bindCloseModalBtn() {
    this.view.closeModalBtn.addEventListener('click', this.#closeModal.bind(this));
  }

  #purchaseLotto(e) {
    try {
      e.preventDefault();
      validator.isInputValid(Number(this.view.moneyInput.value));
      this.lottoGame.insertMoney(Number(this.view.moneyInput.value));
      this.lottoGame.buyLotto();

      this.view.uncheckToggleSwitch();
      this.view.lottosQuantityTemplate(this.lottoGame.lottoWallet);
      this.view.lottosInfoTemplate(this.lottoGame.lottoWallet);
      this.view.showLottoStatusContainer();
      this.view.showWinningLottoContainer();
      this.view.showPurchasedLottos(this.lottoGame.lottoWallet);
    } catch (err) {
      alert(err.message);
    }
    this.view.clearMoneyInput(this.lottoGame.moneyInput % CONDITIONS.LOTTO_PRICE);
  }

  #controllToggleBtn() {
    if (this.view.toggleBtn.checked) {
      this.view.lottoQuantity.classList.add('hidden');
      this.view.lottoIcons.classList.remove('hidden');
      return;
    }
    this.view.lottoIcons.classList.add('hidden');
    this.view.lottoQuantity.classList.remove('hidden');
  }

  #showLottoResult(e) {
    e.preventDefault();
    try {
      validator.isWinningInputValid(
        this.view.getWinningNumbersInput(),
        this.view.bonusNumber.value
      );
      this.lottoGame.getWinningNumbers(
        this.view.getWinningNumbersInput(),
        this.view.bonusNumber.value
      );
      this.lottoGame.compareLottos();
      this.lottoGame.calculateYield();
      this.view.winStatusTemplate();
      this.view.showResultModal();
    } catch (err) {
      alert(err.message);
    }
  }

  #closeModal() {
    this.view.closeModal();
  }
}

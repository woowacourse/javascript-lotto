import { CommonView } from '../view/CommonView.js';
import { LottoGame } from '../model/LottoGame.js';
import { validator } from '../utils.js';
import { CONDITIONS } from '../constants/constants.js';
import { ModalView } from '../view/ModalView.js';

export class Controller {
  constructor() {
    this.commonView = new CommonView();
    this.modalView = new ModalView();
    this.lottoGame = new LottoGame();

    this.bindPurchaseEvent();
    this.bindToggleEvent();
    this.bindShowResultEvent();
    this.bindCloseModalEvent();
    this.bindRestartEvent();
  }

  bindPurchaseEvent() {
    this.commonView.purchaseBtn.addEventListener('click', this.#purchaseLotto.bind(this));
  }

  bindToggleEvent() {
    this.commonView.toggleBtn.addEventListener('click', this.#controllToggleBtn.bind(this));
  }

  bindShowResultEvent() {
    this.commonView.showResultBtn.addEventListener('click', this.#showLottoResult.bind(this));
  }

  bindCloseModalEvent() {
    this.modalView.closeModalBtn.addEventListener('click', this.#closeModal.bind(this));
  }

  bindRestartEvent() {
    this.modalView.restartBtn.addEventListener('click', this.#restartLotto.bind(this));
  }

  #purchaseLotto(e) {
    try {
      e.preventDefault();
      validator.isInputValid(Number(this.commonView.moneyInput.value));
      this.lottoGame.insertMoney(Number(this.commonView.moneyInput.value));
      this.lottoGame.buyLotto();

      this.commonView.uncheckToggleSwitch();
      this.commonView.lottosQuantityTemplate(this.lottoGame.lottoWallet);
      this.commonView.lottosInfoTemplate(this.lottoGame.lottoWallet);
      this.commonView.showLottoStatusContainer();
      this.commonView.showWinningLottoContainer();
      this.commonView.showPurchasedLottos(this.lottoGame.lottoWallet);
    } catch (err) {
      alert(err.message);
    }
    this.commonView.clearMoneyInput(this.lottoGame.moneyInput % CONDITIONS.LOTTO_PRICE);
  }

  #controllToggleBtn() {
    if (this.commonView.toggleBtn.checked) {
      this.commonView.toggleOn();
      return;
    }
    this.commonView.toggleOff();
  }

  #showLottoResult(e) {
    e.preventDefault();
    try {
      validator.isWinningInputValid(
        this.modalView.getWinningNumbersInput(),
        Number(this.modalView.bonusNumber.value)
      );
      this.lottoGame.getWinningNumbers(
        this.modalView.getWinningNumbersInput(),
        Number(this.modalView.bonusNumber.value)
      );
      this.lottoGame.compareLottos();
      this.lottoGame.calculateYield();
      this.modalView.showResultModal(this.lottoGame.winningStatus, this.lottoGame.yield);
    } catch (err) {
      alert(err.message);
    }
  }

  #closeModal() {
    this.modalView.closeModal();
  }

  #restartLotto() {
    this.lottoGame.reStartLottos();
    this.commonView.initView();
    this.modalView.initModalView();
  }
}

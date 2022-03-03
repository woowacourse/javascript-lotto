import { View } from '../view/View.js';
import { LottoGame } from '../model/LottoGame.js';
import { validator } from '../utils.js';

export class LottoController {
  constructor() {
    this.view = new View();
    this.lottoGame = new LottoGame();
    this.bindLottoBtnEvents();
  }

  bindLottoBtnEvents() {
    this.bindPurchaseLottoEvent();
    this.bindToggleEvent();
    this.bindResultBtnEvent();
    this.bindRestartEvent();
  }

  bindPurchaseLottoEvent() {
    this.view.purchaseBtn.addEventListener('click', this.purchaseLottoEvent);
  }

  purchaseLottoEvent = (e) => {
    e.preventDefault();

    if (this.detectInvalidMoneyInput()) {
      return;
    }
    this.lottoGame.insertMoney(Number(this.view.moneyInput.value));
    this.lottoGame.buyLotto();

    this.view.uncheckToggleSwitch();
    this.view.clearMoneyInput();
    this.view.showLottoStatusContainer();
    this.view.showWinningLottoContainer();
    this.view.showPurchasedLottos(this.lottoGame.lottoWallet);
  };

  bindToggleEvent() {
    this.view.toggleBtn.addEventListener('click', this.toggleEvent);
  }

  toggleEvent = () => {
    if (this.view.toggleBtn.checked) {
      this.view.lottosToggleOn(this.lottoGame.lottoWallet);
      return;
    }
    this.view.lottosToggleOff(this.lottoGame.lottoWallet);
  };

  detectInvalidMoneyInput() {
    try {
      validator.isMoneyInputValid(Number(this.view.moneyInput.value));
    } catch (err) {
      alert(err);
      this.view.clearMoneyInput();
      return true;
    }
    return false;
  }

  bindResultBtnEvent() {
    this.view.resultbtn.addEventListener('click', this.resultEvent);
  }

  resultEvent = (e) => {
    e.preventDefault();
    this.getWinningNumbers();
    this.getBonusNumbers();

    this.lottoGame.calculateResult();
    this.lottoGame.calculateEarnRate();

    this.view.showResultOnModal(this.lottoGame);
  };

  getWinningNumbers() {
    this.lottoGame.enterWinningNumbers(Array.from(this.view.winningNumberInput).map((item) => Number(item.value)));
  }
  getBonusNumbers() {
    this.lottoGame.enterBonusNumber(this.view.bonusNumberInput.value);
  }

  bindRestartEvent() {
    this.view.modal.addEventListener('close', this.restartEvent);
  }

  restartEvent = () => {
    this.view.restart();
    this.lottoGame = new LottoGame();
  };
}

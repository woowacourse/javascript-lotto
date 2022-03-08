import { View } from '../view/View.js';
import { LottoGame } from '../model/LottoGame.js';
import { validator } from '../utils.js';
import { CONDITIONS, ERROR_MESSAGE } from '../constants/constants.js';

export class LottoController {
  constructor() {
    this.view = new View();
    this.lottoGame = new LottoGame();
    this.bindLottoBtnEvents();
  }

  bindLottoBtnEvents() {
    this.bindPurchaseLottoBtnEvent();
    this.bindToggleBtnEvent();
    this.bindResultBtnEvent();
    this.bindRestartBtnEvent();
  }

  bindPurchaseLottoBtnEvent() {
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
    this.view.disablePurchaseButton();
  };

  bindToggleBtnEvent() {
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
    if (this.getWinningNumbers() === false) {
      return;
    }

    if (this.getBonusNumbers() === false) {
      return;
    }

    if (this.detectInvalidWinningNumberInput()) {
      return;
    }
    this.lottoGame.calculateResult();
    this.lottoGame.calculateEarnRate();

    this.view.showResultOnModal(this.lottoGame);
  };

  detectInvalidWinningNumberInput() {
    try {
      validator.isWinningNumbersInputValid(this.lottoGame.winningNumbers, this.lottoGame.bonusNumber);
    } catch (err) {
      alert(err);
      this.view.clearWinningLottoInputs();
      return true;
    }
    return false;
  }

  getWinningNumbers() {
    const winningNumberInputArray = Array.from(this.view.winningNumberInput).map((item) => Number(item.value));
    this.lottoGame.enterWinningNumbers(winningNumberInputArray);
    try {
      this.focusEmptyWinningNumber(winningNumberInputArray);
    } catch (err) {
      alert(err);
      return false;
    }
    return true;
  }

  focusEmptyWinningNumber(winningNumberInputArray) {
    if (winningNumberInputArray.filter((element) => element !== 0).length < CONDITIONS.LOTTO_SIZE) {
      let winningNumber = document.getElementById(`winning-number${winningNumberInputArray.indexOf(0)}`);
      winningNumber.focus();
      throw new Error(ERROR_MESSAGE.NOT_ENOUGH_WINNING_NUMBER_INPUT);
    }
  }

  getBonusNumbers() {
    this.lottoGame.enterBonusNumber(this.view.bonusNumberInput.value);
    if (this.lottoGame.bonusNumber === '') {
      alert(ERROR_MESSAGE.NOT_ENOUGH_BONUS_NUMBER_INPUT);
      let bonusNumber = document.getElementById('bonus-number');
      bonusNumber.focus();
      return false;
    }
    return true;
  }

  bindRestartBtnEvent() {
    this.view.modal.addEventListener('close', this.restartEvent);
  }

  restartEvent = () => {
    this.view.restart();
    this.lottoGame = new LottoGame();
  };
}

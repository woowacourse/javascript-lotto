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

  //TODO : 얘가 bonus까지 검사하지 않게 분리
  detectInvalidWinningNumberInput() {
    try {
      validator.isWinningNumbersInputValid(this.lottoGame.winningNumbers, this.lottoGame.bonusNumber);
    } catch (err) {
      alert(err);
      return true;
    }
    return false;
  }

  getWinningNumbers() {
    const winningNumberInputArray = Array.from(this.view.winningNumberInput).map((item) => Number(item.value));
    this.lottoGame.enterWinningNumbers(winningNumberInputArray);
    if (winningNumberInputArray.filter((element) => element !== 0).length < 6) {
      alert('당첨번호 6개 입력 부탁드립니다.');
      let winningNumber = document.getElementById(`winning-number${winningNumberInputArray.indexOf(0)}`);
      winningNumber.focus();
      return false;
    }
    return true;
  }

  getBonusNumbers() {
    this.lottoGame.enterBonusNumber(this.view.bonusNumberInput.value);
    console.log(this.lottoGame.bonusNumber);
    if (this.lottoGame.bonusNumber === '') {
      alert('보너스번호 넣어주세요');
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

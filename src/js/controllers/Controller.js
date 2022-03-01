import { View } from '../view/View.js';
import { LottoGame } from '../model/LottoGame.js';
import { validator } from '../utils.js';

export class LottoController {
  constructor() {
    this.view = new View();
    this.lottoGame = new LottoGame();
    this.purchaseLotto();
  }

  purchaseLotto() {
    this.view.purchaseBtn.addEventListener('click', (e) => {
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

      this.bindToggleEvent();
      this.bindResultEvent();
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

  bindResultEvent() {
    this.view.resultbtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.getWinningNumbers();
      this.getBonusNumbers();

      //결과생성
      this.lottoGame.findResult();
      this.lottoGame.calculateEarnRate();

      //modal창생성
    });
  }

  getWinningNumbers() {
    this.lottoGame.enterWinningNumbers(Array.from(this.view.winningNumberInput).map((item) => Number(item.value)));
  }
  getBonusNumbers() {
    this.lottoGame.enterBonusNumber(this.view.bonusNumberInput.value);
  }
}

import ERROR from '../constants/error.js';
import View from '../views/View.js';
import LottoGame from '../domains/LottoGame.js';
import lottoGameValidatorStep2 from '../domains/lottoGameValidatorStep2.js';

class LottoGameControllerStep2 {
  view = new View();
  lottoGame;

  startGame() {
    this.bindLottoButtonEvents();
  }

  bindLottoButtonEvents() {
    this.bindBuyButtonEvent();
    this.bindShowResultButtonEvent();
    this.bindModalCloseButtonEvent();
    this.bindRestartButtonEvent();
  }

  bindBuyButtonEvent() {
    this.view.buyButton.addEventListener('click', this.onClickBuyButton);
  }

  bindShowResultButtonEvent() {
    this.view.showResultButton.addEventListener('click', this.onClickShowResultButton);
  }

  bindModalCloseButtonEvent() {
    this.view.modalCloseButton.addEventListener('click', this.onClickModalCloseButton);
  }

  bindRestartButtonEvent() {
    this.view.restartButton.addEventListener('click', this.onClickRestartButton);
  }

  onClickBuyButton = event => {
    event.preventDefault();

    const buyMoney = Number(this.view.buyMoneyInput.value);

    if (!this.validateBuyMoney(buyMoney)) return false;

    this.lottoGame = new LottoGame(buyMoney);

    const lottoNumbersList = this.lottoGame.getLottoNumbersList();

    this.view.printPurchasedLottos(lottoNumbersList);
  };

  validateBuyMoney(buyMoney) {
    if (!lottoGameValidatorStep2.isValidBuyMoney(buyMoney)) {
      alert(ERROR.BUY_MONEY);
      this.view.buyMoneyInput.focus();
      return false;
    }
    return true;
  }

  onClickShowResultButton = event => {
    event.preventDefault();

    const luckyNumbers = [...this.view.luckyNumbersInput].map(number => Number(number.value));
    const bonusNumber = Number(this.view.bonusNumberInput.value);

    if (!this.validateWinningNumbers(luckyNumbers, bonusNumber)) return false;

    this.lottoGame.initWinningNumbers(luckyNumbers, bonusNumber);

    const amountOfRanks = this.lottoGame.getAmountOfRanks();
    const profit = this.lottoGame.calculateProfit();

    this.view.printResult(amountOfRanks, profit);
  };

  validateWinningNumbers(luckyNumbers, bonusNumber) {
    if (!lottoGameValidatorStep2.isValidLuckyNumbers(luckyNumbers)) {
      alert(ERROR.LUCKY_NUMBERS);
      this.view.luckyNumbersInput[0].focus();
      return false;
    }

    if (!lottoGameValidatorStep2.isValidBonusNumber(bonusNumber, luckyNumbers)) {
      alert(ERROR.BONUS_NUMBER);
      this.view.bonusNumberInput.focus();
      return false;
    }

    return true;
  }

  onClickModalCloseButton = () => {
    this.view.hideModal();
    this.lottoGame.resetWinningNumbers();
    this.lottoGame.resetAmountOfRanks();
  };

  onClickRestartButton = () => {
    this.view.resetScreen();
  };
}

export default LottoGameControllerStep2;

import ERROR from '../constants/error.js';
import lottoView from '../views/lottoView.js';
import LottoGame from '../domains/LottoGame.js';
import lottoGameValidatorStep2 from '../domains/lottoGameValidatorStep2.js';

class LottoGameControllerStep2 {
  lottoGame;

  startGame() {
    this.bindLottoButtonEventHandlers();
  }

  bindLottoButtonEventHandlers() {
    lottoView.bindBuyButtonEventHandler(this.onClickBuyButton);
    lottoView.bindShowResultButtonEventHandler(this.onClickShowResultButton);
    lottoView.bindModalCloseButtonEventHandler(this.onClickModalCloseButton);
    lottoView.bindRestartButtonEventHandler();
  }

  onClickBuyButton = buyMoney => {
    if (!this.validateBuyMoney(buyMoney)) return false;

    this.lottoGame = new LottoGame(buyMoney);

    const lottoNumbersList = this.lottoGame.getLottoNumbersList();

    lottoView.printPurchasedLottos(lottoNumbersList);
  };

  validateBuyMoney(buyMoney) {
    if (!lottoGameValidatorStep2.isValidBuyMoney(buyMoney)) {
      alert(ERROR.BUY_MONEY);
      lottoView.buyMoneyInput.focus();
      return false;
    }
    return true;
  }

  onClickShowResultButton = (bonusNumber, luckyNumbers) => {
    if (!this.validateWinningNumbers(luckyNumbers, bonusNumber)) return false;

    this.lottoGame.initWinningNumbers(luckyNumbers, bonusNumber);

    const amountOfRanks = this.lottoGame.getAmountOfRanks();
    const profit = this.lottoGame.calculateProfit();

    lottoView.printResult(amountOfRanks, profit);
  };

  validateWinningNumbers(luckyNumbers, bonusNumber) {
    if (!lottoGameValidatorStep2.isValidLuckyNumbers(luckyNumbers)) {
      alert(ERROR.LUCKY_NUMBERS);
      lottoView.luckyNumbersInput[0].focus();
      return false;
    }

    if (!lottoGameValidatorStep2.isValidBonusNumber(bonusNumber, luckyNumbers)) {
      alert(ERROR.BONUS_NUMBER);
      lottoView.bonusNumberInput.focus();
      return false;
    }

    return true;
  }

  onClickModalCloseButton = () => {
    this.lottoGame.resetWinningNumbers();
    this.lottoGame.resetAmountOfRanks();
  };
}

export default LottoGameControllerStep2;

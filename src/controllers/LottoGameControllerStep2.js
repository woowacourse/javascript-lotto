import View from '../views/View.js';
import LottoGame from '../domains/LottoGame.js';

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
    this.lottoGame = new LottoGame(buyMoney);
    const lottoNumbersList = this.lottoGame.getLottoNumbersList();
    this.view.printPurchasedLottos(lottoNumbersList);
  };

  onClickShowResultButton = event => {
    event.preventDefault();

    const luckyNumbers = [...this.view.luckyNumbersInput].map(number => Number(number.value));
    const bonusNumber = Number(this.view.bonusNumberInput.value);

    this.lottoGame.initWinningNumbers(luckyNumbers, bonusNumber);

    const amountOfRanks = this.lottoGame.getAmountOfRanks();
    const profit = this.lottoGame.calculateProfit();

    this.view.printResult(amountOfRanks, profit);
  };

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

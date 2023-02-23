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
  }

  bindBuyButtonEvent() {
    this.view.buyButton.addEventListener('click', this.onClickBuyButton);
  }

  onClickBuyButton = event => {
    event.preventDefault();
    const buyMoney = Number(this.view.buyMoneyInput.value);
    this.lottoGame = new LottoGame(buyMoney);
    const lottoNumbersList = this.lottoGame.getLottoNumbersList();
    this.view.printPurchasedLottos(lottoNumbersList);
  };

  bindShowResultButtonEvent() {
    this.view.showResultButton.addEventListener('click', this.onClickShowResultButton);
  }

  onClickShowResultButton = event => {
    event.preventDefault();

    const luckyNumbers = [...this.view.luckyNumbersInput].map(number => Number(number.value));
    const bonusNumber = Number(this.view.bonusNumberInput.value);

    this.lottoGame.initWinningNumbers(luckyNumbers, bonusNumber);

    const amountOfRanks = this.lottoGame.getAmountOfRanks();
    const profit = this.lottoGame.calculateProfit();

    this.view.printResult(amountOfRanks, profit);
  };

  bindModalCloseButtonEvent() {
    this.view.modalCloseButton.addEventListener('click', this.onClickModalCloseButton);
  }

  onClickModalCloseButton = () => {
    this.view.hideModal();
    this.lottoGame.resetAmountOfRanks();
  };
}

export default LottoGameControllerStep2;

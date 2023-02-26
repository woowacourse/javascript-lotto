import lottoView from '../views/lottoView.js';
import LottoGame from '../domains/LottoGame.js';

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
    this.lottoGame = new LottoGame(buyMoney);

    const lottoNumbersList = this.lottoGame.getLottoNumbersList();

    lottoView.printPurchasedLottos(lottoNumbersList);
  };

  onClickShowResultButton = (bonusNumber, luckyNumbers) => {
    this.lottoGame.initWinningNumbers(luckyNumbers, bonusNumber);

    const amountOfRanks = this.lottoGame.getAmountOfRanks();
    const profit = this.lottoGame.calculateProfit();

    lottoView.printResult(amountOfRanks, profit);
  };

  onClickModalCloseButton = () => {
    this.lottoGame.resetWinningNumbers();
    this.lottoGame.resetAmountOfRanks();
  };
}

export default LottoGameControllerStep2;

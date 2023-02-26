import lottoView from '../views/lottoView.js';
import LottoGame from '../domains/LottoGame.js';

class LottoGameControllerStep2 {
  lottoGame;

  constructor() {
    this.bindLottoButtonEventHandlers();
  }

  startGame() {
    this.lottoGame = new LottoGame();
  }

  bindLottoButtonEventHandlers() {
    lottoView.bindBuyButtonEventHandler(this.onClickBuyButton);
    lottoView.bindShowResultButtonEventHandler(this.onClickShowResultButton);
    lottoView.bindModalCloseButtonEventHandler(this.onClickModalCloseButton);
    lottoView.bindRestartButtonEventHandler(this.onClickRestartButton);
  }

  onClickBuyButton = buyMoney => {
    this.lottoGame.buyLottos(buyMoney);

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

  onClickRestartButton = () => {
    this.startGame();
  };
}

export default LottoGameControllerStep2;

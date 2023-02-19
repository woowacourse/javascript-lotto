import InputView from './view/InputView.js';
import OutputView from './view/OutputView.js';
import LottoGame from './domain/LottoGame.js';
import Console from './util/Console.js';
import COMMAND from './constant/command.js';

const App = {
  lottoGame: null,

  async beginLotto() {
    await this.purchaseLottos();
    await this.registerWinningNumbers();
    await this.calculateLotto();

    if (await this.isRetry()) {
      this.beginLotto();
      return;
    }

    this.endLotto();
  },

  async purchaseLottos() {
    const lottoPrice = await InputView.readLottoPrice();

    this.lottoGame = new LottoGame(lottoPrice);
    OutputView.printLottos(this.lottoGame.getLottos());
  },

  async registerWinningNumbers() {
    const luckyNumbers = await InputView.readLuckyNumbers();
    const bonusNumber = await InputView.readBonusNumber(luckyNumbers);

    this.lottoGame.initWinningNumbers({ luckyNumbers, bonusNumber });
  },

  async calculateLotto() {
    const amountOfRanks = this.lottoGame.drawLotto();
    const profit = this.lottoGame.calculateProfit();

    OutputView.printStatistics(amountOfRanks, profit);
  },

  async isRetry() {
    return (await InputView.readRetryCommand()) === COMMAND.RETRY;
  },

  endLotto() {
    Console.close();
  },
};

App.beginLotto();

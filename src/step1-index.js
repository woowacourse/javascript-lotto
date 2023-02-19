import InputView from './view/InputView.js';
import OutputView from './view/OutputView.js';
import LottoGame from './domain/LottoGame.js';
import Console from './util/Console.js';

const App = {
  instance: {
    lottoGame: null,
  },

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

    this.instance.lottoGame = new LottoGame(lottoPrice);
    OutputView.printLottos(this.instance.lottoGame.getLottos());
  },

  async registerWinningNumbers() {
    const luckyNumbers = await InputView.readLuckyNumbers();
    const bonusNumber = await InputView.readBonusNumber(luckyNumbers);

    this.instance.lottoGame.initWinningNumbers(luckyNumbers, bonusNumber);
  },

  async calculateLotto() {
    const amountOfRanks = this.instance.lottoGame.drawLotto();
    const profit = this.instance.lottoGame.calculateProfit();
    OutputView.printStatistics(amountOfRanks, profit);
  },

  async isRetry() {
    return await InputView.readRetry();
  },

  endLotto() {
    Console.close();
  },
};

App.beginLotto();

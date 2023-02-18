import InputView from './view/InputView.js';
import OutputView from './view/OutputView.js';
import LottoGame from './domain/LottoGame.js';
import Console from './util/Console.js';

const App = {
  instance: {
    lottoGame: null,
  },

  async init() {
    const lottoPrice = await InputView.readLottoPrice();

    this.instance.lottoGame = new LottoGame(lottoPrice);
    OutputView.printLottoNumbersList(
      this.instance.lottoGame.getLottoNumbersList()
    );

    const luckyNumbers = await InputView.readLuckyNumbers();
    const bonusNumber = await InputView.readBonusNumber([...luckyNumbers]);
    this.instance.lottoGame.initWinningNumbers(luckyNumbers, bonusNumber);

    this.execute();
  },

  async execute() {
    OutputView.printStatistics(
      this.instance.lottoGame.execute(),
      this.instance.lottoGame.calculateProfit()
    );

    if (await this.isRetry()) {
      this.init();
      return;
    }

    this.exit();
  },

  async isRetry() {
    return await InputView.readRetry();
  },

  exit() {
    Console.close();
  },
};

App.init();

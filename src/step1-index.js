import InputView from './view/InputView.js';
import OutputView from './view/OutputView.js';
import LottoGame from './domain/LottoGame.js';
import Console from './util/Console.js';

const App = {
  instance: {
    lottoGame: null,
  },

  async start() {
    await this.init();
  },

  async init() {
    this.instance.lottoGame = new LottoGame(await InputView.readLottoPrice());
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

    if (await InputView.readRetry()) {
      this.start();
      return;
    }

    this.exit();
  },

  exit() {
    Console.close();
  },
};

App.start();

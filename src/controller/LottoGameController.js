import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import LottoGame from '../domain/LottoGame.js';
import Console from '../util/Console.js';

const LottoGameController = {
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
    this.instance.lottoGame.initWinningNumbers(
      await InputView.readLuckyNumbers(),
      await InputView.readBonusNumber()
    );

    this.execute();
  },

  async execute() {
    OutputView.printStatistics(
      this.instance.lottoGame.execute(),
      this.instance.lottoGame.calculateProfit()
    );

    if (!(await InputView.readRetry())) this.exit();

    this.start();
  },

  exit() {
    Console.close();
  },
};

export default LottoGameController;

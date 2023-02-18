import inputView from '../views/inputView.js';
import outputView from '../views/outputView.js';
import LottoGame from '../domains/LottoGame.js';
import Console from '../utils/Console.js';

class LottoGameController {
  #lottoGame;

  async start() {
    await this.init();
  }

  async init() {
    this.lottoGame = new LottoGame(await inputView.readLottoPrice());
    outputView.printLottoNumbersList(this.lottoGame.getLottoNumbersList());

    const luckyNumbers = await inputView.readLuckyNumbers();
    const bonusNumber = await inputView.readBonusNumber([...luckyNumbers]);

    this.lottoGame.initWinningNumbers(luckyNumbers, bonusNumber);

    this.execute();
  }

  async execute() {
    outputView.printStatistics(
      this.lottoGame.execute(),
      this.lottoGame.calculateProfit()
    );

    if (await inputView.readRetry()) {
      this.start();
      return;
    }

    this.exit();
  }

  exit() {
    Console.close();
  }
}

export default LottoGameController;

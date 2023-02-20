import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import LottoGame from '../domain/feature/LottoGame.js';

class LottoGameConsoleController {
  #lottoGame;

  constructor() {
    this.#lottoGame = new LottoGame();
  }

  async play() {
    await this.purchaseLottos();
    this.printPurChasedLottoCount();
    this.printPurchasedLottos();
    await this.generateWinningLottoNumbers();
    this.printWinningRankResult();
    this.printProfitRate();
    await this.requestRetryCommand();
  }

  async purchaseLottos() {
    try {
      const purchaseMoney = await InputView.readPurchaseMoney();
      this.#lottoGame.purchaseLottos(purchaseMoney);
    } catch (error) {
      OutputView.printErrorMessage(error);
      return this.purchaseLottos();
    }
  }

  printPurChasedLottoCount() {
    const purchasedLottoCount = this.#lottoGame.getLottos().length;
    OutputView.printPurchasedLottoCount(purchasedLottoCount);
  }

  printPurchasedLottos() {
    const purchasedLottos = this.#lottoGame.getLottos();
    OutputView.printPurChasedLottoList(purchasedLottos);
  }

  async generateWinningLottoNumbers() {
    try {
      const winningLottoString = await InputView.readWinningLottoNumbers();
      const winningLottoNumber = winningLottoString.split(',').map((number) => Number(number));
      const bonusNumber = await InputView.readBonusLottoNumber();
      this.#lottoGame.generateWinningLotto(winningLottoNumber, bonusNumber);
    } catch (error) {
      OutputView.printErrorMessage(error);
      return this.generateWinningLottoNumbers();
    }
  }

  printWinningRankResult() {
    const winningRankResult = this.#lottoGame.getWinningRankResult();
    OutputView.printWinningRankResult(winningRankResult);
  }

  printProfitRate() {
    const profitRate = this.#lottoGame.getProfitRateOfPrize();
    OutputView.printProfitRate(profitRate);
  }

  async requestRetryCommand() {
    try {
      const retryCommand = await InputView.readRetryCommand();
      const isRetry = this.#lottoGame.determineRetry(retryCommand);
      isRetry ? this.retry() : OutputView.closeConsole();
    } catch (error) {
      OutputView.printErrorMessage(error);
      return this.requestRetryCommand();
    }
  }

  retry() {
    this.#lottoGame = new LottoGame();
    this.play();
  }
}

export default LottoGameConsoleController;

import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import LottoGame from '../domain/LottoGame.js';
import parseToNumberTypeArray from '../utils/parseToNumberTypeArray.js';
import { SPLIT_STR } from '../utils/constants.js';

class LottoGameStep1Controller {
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
      const winningLottoNumber = parseToNumberTypeArray(winningLottoString, SPLIT_STR);
      const bonusNumber = Number(await InputView.readBonusLottoNumber());
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

export default LottoGameStep1Controller;

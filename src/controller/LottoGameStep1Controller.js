import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import LottoGame from '../domain/LottoGame.js';
import parseToNumberTypeArray from '../utils/parseToNumberTypeArray.js';
import { LOTTO_PRICE } from '../utils/constants.js';

class LottoGameStep1Controller {
  #lottoGame;

  constructor() {
    this.#lottoGame = new LottoGame();
  }

  async play() {
    await this.purchaseLottos();
    await this.generateWinningLottoNumbers();
    this.printWinningRankResult();
    this.printProfitRate();
    await this.requestRetryCommand();
  }

  async purchaseLottos() {
    try {
      const purchaseMoney = await InputView.readPurchaseMoney();
      this.#lottoGame.purchaseLottos(purchaseMoney);
      const purchasedLottoCount = purchaseMoney / LOTTO_PRICE;
      OutputView.printPurchasedLottoCount(purchasedLottoCount);

      const purchasedLottos = this.#lottoGame.getLottos();
      OutputView.printPurChasedLottoList(purchasedLottos);
    } catch (error) {
      OutputView.printErrorMessage(error);
      return this.purchaseLottos();
    }
  }

  async generateWinningLottoNumbers() {
    try {
      const winningLottoString = await InputView.readWinningLottoNumbers();
      const winningLottoNumber = parseToNumberTypeArray(winningLottoString);
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
      if (isRetry) {
        this.#lottoGame = new LottoGame();
        return this.play();
      }
      OutputView.closeConsole();
    } catch (error) {
      OutputView.printErrorMessage(error);
      return this.requestRetryCommand();
    }
  }
}

export default LottoGameStep1Controller;

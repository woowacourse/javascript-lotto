import { SYMBOL } from "../constants/condition";
import { ERROR_MESSAGE } from "../constants/message";
import LottoStore from "../domain/LottoStore";
import Validator from "../utils/Validator";
import InputView from "../view/InputView";
import OutputView from "../view/OutputView";

class Controller {
  #lottoStore;

  constructor() {
    this.#lottoStore = new LottoStore();
  }

  async purchaseLottos() {
    try {
      const purchaseAmount = await InputView.readPurchaseAmount();
      const lottoCount = this.#lottoStore.calculateLottoCount(purchaseAmount);
      const randomNumbers = this.#lottoStore.generateRandomNumbers(lottoCount);
      this.#lottoStore.issueLottos(randomNumbers);

      OutputView.printLottos(this.#lottoStore.lottos);
    } catch (error) {
      OutputView.print(error.message);
      return this.purchaseLottos();
    }
  }

  async issueWinningLotto() {
    try {
      const winningNumbers = await InputView.readWinningNumber();
      const bonusNumber = await InputView.readBonusNumber();

      this.#lottoStore.setWinningLotto(winningNumbers, bonusNumber);
    } catch (error) {
      OutputView.print(error.message);
      return this.issueWinningLotto();
    }
  }

  calculateProfitRate() {
    const rankings = this.#lottoStore.checkRanking();
    const totalProfitRate = this.#lottoStore.getTotalProfitRate(rankings);

    OutputView.printRankings(rankings);
    OutputView.printTotalProfitRate(totalProfitRate);
  }

  async retryGame() {
    const isRetry = await InputView.readRetry();

    if (!Validator.checkRetryInput(isRetry)) {
      OutputView.print(ERROR_MESSAGE.invalidInput);
      return this.retryGame();
    }

    return isRetry === SYMBOL.yes ? true : false;
  }
}

export default Controller;

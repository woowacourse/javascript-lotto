import { ERROR_MESSAGE } from "./constants/message";
import LottoStore from "./domain/LottoStore";
import InputView from "./view/InputView";
import OutputView from "./view/OutputView";

class App {
  #lottoStore;

  constructor() {
    this.#lottoStore = new LottoStore();
  }

  async play() {
    const lottos = await this.#purchaseLottos();
    OutputView.printLottos(lottos);

    await this.#generateWinningLotto();

    const { rankings, totalProfitRate } = this.#calculateProfitRate(lottos);
    OutputView.printRankings(rankings);
    OutputView.printTotalProfitRate(totalProfitRate);

    this.retryGame();
  }

  async retryGame() {
    const retryYes = "y";
    const retryNo = "n";
    const isRetry = await InputView.readRetry();

    if (isRetry !== retryYes && isRetry !== retryNo) {
      OutputView.print(ERROR_MESSAGE.invalidInput);
      return this.retryGame();
    }

    if (isRetry === "y") return this.play();
  }

  async #purchaseLottos() {
    try {
      const purchaseAmount = await InputView.readPurchaseAmount();
      const lottoCount = this.#lottoStore.calculateLottoCount(purchaseAmount);
      const randomNumbers = this.#lottoStore.generateRandomNumbers(lottoCount);
      const lottos = this.#lottoStore.issueLottos(randomNumbers);

      return lottos;
    } catch (error) {
      OutputView.print(error.message);
      return this.#purchaseLottos();
    }
  }

  async #generateWinningLotto() {
    try {
      const winningNumbers = await InputView.readWinningNumber();
      const bonusNumber = await InputView.readBonusNumber();

      this.#lottoStore.setWinningLotto(winningNumbers, bonusNumber);
    } catch (error) {
      OutputView.print(error.message);
      return this.#generateWinningLotto();
    }
  }

  #calculateProfitRate(lottos) {
    const winningLottoCounts =
      this.#lottoStore.calculateWinningLottoCount(lottos);
    const rankings = winningLottoCounts.map(
      ({ correctCount, isBonusCorrect }) =>
        this.#lottoStore.checkRanking(correctCount, isBonusCorrect),
    );

    const totalProfitRate = this.#lottoStore.getTotalProfitRate(rankings);

    return { rankings, totalProfitRate };
  }
}

export default App;

import LottoGame from "./domain/LottoGame";
import InputView from "./view/step1/InputView";
import OutputView from "./view/step1/OutputView";
import { ERROR_MESSAGE } from "./constants/message";
import splitByDelimiter from "./utils/splitByDelimiter";
import { SYMBOL } from "./constants/condition";

class App {
  #lottoGame;

  constructor() {
    this.#lottoGame = new LottoGame();
  }

  async play() {
    const lottoes = await this.#purchaseLottos();
    const winningLotto = await this.#generateWinningLotto();

    this.#drawLotto(lottoes, winningLotto);

    this.#replay();
  }

  async #purchaseLottos() {
    try {
      const purchaseAmount = Number(await InputView.readPurchaseAmount());
      const lottoes = this.#lottoGame.issueLottoes(purchaseAmount);
      OutputView.printLottos(lottoes);

      return lottoes;
    } catch (error) {
      OutputView.print(error.message);
      return this.#purchaseLottos();
    }
  }

  async #generateWinningLotto() {
    try {
      const winningNumbers = splitByDelimiter(
        await InputView.readWinningNumber(),
        SYMBOL.delimiter,
      );
      const bonusNumber = Number(await InputView.readBonusNumber());

      return this.#lottoGame.generateWinningLotto(winningNumbers, bonusNumber);
    } catch (error) {
      OutputView.print(error.message);
      return this.#generateWinningLotto();
    }
  }

  #drawLotto(lottoes, winningLotto) {
    const { rankings, totalProfitRate } = this.#lottoGame.drawLotto(
      lottoes,
      winningLotto,
    );

    OutputView.printRankings(rankings);
    OutputView.printTotalProfitRate(totalProfitRate);
  }

  async #replay() {
    const retryYes = "y";
    const retryNo = "n";
    const isRetry = (await InputView.readRetry()).toLowerCase();

    if (isRetry !== retryYes && isRetry !== retryNo) {
      OutputView.print(ERROR_MESSAGE.invalidInput);
      return this.#replay();
    }

    if (isRetry === "y") return this.play();
  }
}

export default App;

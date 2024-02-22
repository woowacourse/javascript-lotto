import Lotto from "../domains/Lotto";
import LottoResult from "../domains/LottoResult";
import LottoStore from "../domains/LottoStore";
import WinningLotto from "../domains/WinningLotto";
import InputView from "../views/InputView";
import OutputView from "../views/OutputView";

class LottoController {
  #lottos;
  #winningLotto;

  constructor() {
    this.#lottos = null;
    this.#winningLotto = null;
  }

  async #purchaseLottos() {
    const lottoAmount = await InputView.readPurchaseAmount();

    try {
      const lottos = LottoStore.purchaseLottos(lottoAmount);
      this.#lottos = lottos;
    } catch (error) {
      OutputView.printMessage(error.message);
      await this.#purchaseLottos();
    }
  }

  async #getWinningLotto() {
    const winningNumber = await InputView.readWinningLotto();
    const winningNumberArray = winningNumber
      .split(",")
      .map((winningNumber) => Number(winningNumber));

    try {
      return new Lotto(winningNumberArray);
    } catch (error) {
      OutputView.printMessage(error.message);
      return await this.#getWinningLotto();
    }
  }

  async #configWinningLotto(winningLotto) {
    const bonusNumber = await InputView.readBonusNumber();

    try {
      this.#winningLotto = new WinningLotto(winningLotto, bonusNumber);
    } catch (error) {
      OutputView.printMessage(error.message);
      await this.#configWinningLotto(winningLotto);
    }
  }

  printLottos() {
    const lottoNumbers = this.#lottos.map((lotto) => lotto.getNumbers());
    const lottosCount = lottoNumbers.length;
    OutputView.printTotalLottos(lottoNumbers, lottosCount);
  }

  #printWinningResult() {
    const lottoResult = new LottoResult();
    lottoResult.generateResult(this.#lottos, this.#winningLotto);

    const lottoResultBoard = lottoResult.getRankBoard();
    OutputView.printWinningResult(lottoResultBoard);

    const returnRate = lottoResult.calculateReturnRate(
      this.#lottos.length * 1000
    );
    OutputView.printReturnRate(returnRate);
  }

  async #askRestart() {
    const retrySign = await InputView.readRetrySign();

    if (retrySign === "n") {
      return;
    }

    if (retrySign === "y") {
      return await this.run();
    }

    throw new Error("[ERROR]");
  }

  async #handleRestart() {
    try {
      await this.#askRestart();
    } catch (error) {
      OutputView.printMessage(error.message);
      await this.#handleRestart();
    }
  }

  async run() {
    await this.#purchaseLottos();
    this.printLottos();

    const winningLotto = await this.#getWinningLotto();
    await this.#configWinningLotto(winningLotto);

    this.#printWinningResult();
    this.#handleRestart();
  }
}

export default LottoController;

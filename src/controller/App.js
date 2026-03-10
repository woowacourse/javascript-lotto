import { Console } from "@woowacourse/mission-utils";
import InputView from "../console/ConsoleInputView.js";
import OutputView from "../console/ConsoleOutputView.js";
import LottoManager from "../service/LottoManager.js";

export default class App {
  #lottoManager;

  constructor() {
    this.#lottoManager = new LottoManager();
  }

  async run() {
    do {
      await this.#processBuyLottos();
      const winningLotto = await this.#processWinning();
      await this.#processResult(winningLotto);
    } while (await this.#readIsRetry());
  }

  async #processBuyLottos() {
    const lottoNumbers = await this.#retryUntilSuccess(() => this.#buyLottos());
    OutputView.printLottos(lottoNumbers);
  }

  async #buyLottos() {
    const amount = await InputView.readPurchaseAmount();
    return this.#lottoManager.buyLottos(amount);
  }

  async #processWinning() {
    const winningLotto = await this.#retryUntilSuccess(() =>
      this.#readWinningLotto(),
    );
    return await this.#retryUntilSuccess(() =>
      this.#getWinningNumber(winningLotto),
    );
  }

  async #readWinningLotto() {
    const numbers = await InputView.readWinningNumbers();
    return this.#lottoManager.createWinningLotto(numbers);
  }

  async #getWinningNumber(winningLotto) {
    const bonus = await InputView.readBonusNumber();
    return this.#lottoManager.createWinningNumber(winningLotto, bonus);
  }

  async #processResult(winningLotto) {
    const { prizeList, profitRate } = this.#lottoManager.getLotteryResult(winningLotto);
    OutputView.printStatistics({ prizeList, profitRate });
  }

  async #readIsRetry() {
    return this.#retryUntilSuccess(async () => {
      return InputView.readIsRetry();
    });
  }

  async #retryUntilSuccess(action) {
    while (true) {
      try {
        return await action();
      } catch (e) {
        Console.print(e.message);
      }
    }
  }
}

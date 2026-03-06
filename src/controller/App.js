import { Console } from "@woowacourse/mission-utils";
import InputView from "../console/ConsoleInputView.js";
import OutputView from "../console/ConsoleOutputView.js";
import Lotto from "../domain/Lotto.js";
import LottoManager from "../service/LottoManager.js";

export default class App {
  #lottoManager;

  constructor() {
    this.#lottoManager = new LottoManager();
  }

  async run() {
    do {
      const lottos = await this.#processBuyLottos();
      const winningLotto = await this.#processWinning();
      await this.#processResult(lottos, winningLotto);
    } while (await this.#readIsRetry());
  }

  async #processBuyLottos() {
    const lottos = await this.#retryUntilSuccess(() => this.#buyLottos());
    const lottosList = lottos.map((lotto) => lotto.getNumbers());
    OutputView.printLottos(lottosList);
    return lottos;
  }

  async #buyLottos() {
    const budget = await InputView.readPurchaseAmount();
    return this.#lottoManager.buyLottos(budget);
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
    return new Lotto(numbers);
  }

  async #getWinningNumber(winningLotto) {
    const bonusNumber = await InputView.readBonusNumber();
    return this.#lottoManager.createWinningNumber({
      winningLotto,
      bonusNumber,
    });
  }

  async #processResult(lottos, winningLotto) {
    const { prizeList, profitRate } = this.#lottoManager.getLotteryResult(
      lottos,
      winningLotto,
    );

    const formatPrizeList = prizeList.map((stats) => {
      const { matchCount, hasBonus } = stats.rank.getResult();
      return {
        matchCount,
        hasBonus,
        prize: stats.prize,
        count: stats.count,
      };
    });
    OutputView.printStatistics({ formatPrizeList, profitRate });
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

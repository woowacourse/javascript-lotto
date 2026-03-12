import Lotto from "../domain/Lotto.js";
import LottoManager from "../service/LottoManager.js";

export default class App {
  #lottoManager;
  #views;

  constructor(views) {
    this.#lottoManager = new LottoManager();
    this.#views = views;
  }

  async run() {
    do {
      const lottos = await this.#processBuyLottos();
      const winningNumbers = await this.#processWinningNumbers();
      await this.#processResult(lottos, winningNumbers);
    } while (await this.#readIsRetry());
  }

  async #processBuyLottos() {
    const lottos = await this.#retryUntilSuccess(() => this.#buyLottos());
    const lottosList = lottos.map((lotto) => lotto.getNumbers());
    this.#views.outputView.printLottos(lottosList);
    return lottos;
  }

  async #buyLottos() {
    const budget = await this.#views.inputView.readPurchaseAmount();
    return this.#lottoManager.buyLottos(budget);
  }

  async #processWinningNumbers() {
    return await this.#retryUntilSuccess(async () => {
      const winningLotto = await this.#readWinningLotto();
      return this.#createWinningNumbers(winningLotto);
    });
  }

  async #readWinningLotto() {
    const numbers = await this.#views.inputView.readWinningNumbers();
    return new Lotto(numbers);
  }

  async #createWinningNumbers(winningLotto) {
    const bonusNumber = await this.#views.inputView.readBonusNumber();
    return this.#lottoManager.createWinningNumber({
      winningLotto,
      bonusNumber,
    });
  }

  async #processResult(lottos, winningNumbers) {
    const result = this.#lottoManager.getLotteryResult(lottos, winningNumbers);
    this.#views.outputView.printStatistics(result);
  }

  async #readIsRetry() {
    return this.#retryUntilSuccess(async () => {
      return this.#views.inputView.readIsRetry();
    });
  }

  async #retryUntilSuccess(action) {
    while (true) {
      try {
        return await action();
      } catch (e) {
        this.#views.outputView.printError(e);
      }
    }
  }
}

import { Console } from "@woowacourse/mission-utils";
import Lotto from "../domain/Lotto.js";
import LottoManager from "../service/LottoManager.js";
import VIEW_CONFIG from "../config/viewConfig.js";

export default class App {
  #lottoManager;
  #mode;

  constructor({ mode = "console" } = {}) {
    if (!VIEW_CONFIG[mode]) {
      throw new Error(`[ERROR] 지원하지 않는 모드입니다: ${mode}`);
    }
    this.#lottoManager = new LottoManager();
    this.#mode = mode;
  }

  async run() {
    do {
      const lottos = await this.#processBuyLottos();
      const winningNumber = await this.#processWinningNumber();
      await this.#processResult(lottos, winningNumber);
    } while (await this.#readIsRetry());
  }

  async #processBuyLottos() {
    const lottos = await this.#retryUntilSuccess(() => this.#buyLottos());
    const lottosList = lottos.map((lotto) => lotto.getNumbers());
    this.#outputView.printLottos(lottosList);
    return lottos;
  }

  async #buyLottos() {
    const budget = await this.#inputView.readPurchaseAmount();
    return this.#lottoManager.buyLottos(budget);
  }

  async #processWinningNumber() {
    const winningLotto = await this.#retryUntilSuccess(() =>
      this.#readWinningLotto(),
    );
    return await this.#retryUntilSuccess(() =>
      this.#getWinningNumber(winningLotto),
    );
  }

  async #readWinningLotto() {
    const numbers = await this.#inputView.readWinningNumbers();
    return new Lotto(numbers);
  }

  async #getWinningNumber(winningLotto) {
    const bonusNumber = await this.#inputView.readBonusNumber();
    return this.#lottoManager.createWinningNumber({
      winningLotto,
      bonusNumber,
    });
  }

  async #processResult(lottos, winningLotto) {
    const result = this.#lottoManager.getLotteryResult(lottos, winningLotto);
    this.#outputView.printStatistics(result);
  }

  async #readIsRetry() {
    return this.#retryUntilSuccess(async () => {
      return this.#inputView.readIsRetry();
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

  get #inputView() {
    return VIEW_CONFIG[this.#mode].inputView;
  }

  get #outputView() {
    return VIEW_CONFIG[this.#mode].outputView;
  }
}

import Input from "./view/Input.js";
import Money from "./model/Money.js";
import LottoStore from "./model/LottoStore.js";
import WinningLotto from "./model/WinningLotto.js";
import { INPUT_MESSAGE, ERROR_MESSAGE } from "./constant/message.js";
import { parseNumbers } from "./utils.js";
import Lotto from "./model/Lotto.js";
import Output from "./view/Output.js";

class App {
  #input;
  #lottoStore;

  constructor({ input, lottoStore } = {}) {
    this.#input = input ?? new Input();
    this.#lottoStore = lottoStore ?? new LottoStore();
  }

  async run() {
    const money = await this.#askMoney();
    const lottos = this.#lottoStore.issuedLottos(money.getMoney());
    Output.printPurchasedLottos(lottos);

    const winningNumbers = await this.#askWinningNumbers();
    const winningLotto = await this.#askBonusNumber(winningNumbers);

    const lottoGameResult = winningLotto.evaluateLottos(lottos);
    const returnOnInvestment = lottoGameResult.getReturnOnInvestment(
      money.getMoney(),
    );
    Output.printResult(lottoGameResult.getCounts(), returnOnInvestment);

    await this.#askRetry();
    return;
  }

  async #askBonusNumber(lotto) {
    return await this.#retry(async () => {
      const inputBonus = await this.#input.readLineAsync(
        INPUT_MESSAGE.BONUS_NUMBER,
      );
      const bonusNumber = Number(inputBonus);

      const winningLotto = new WinningLotto(lotto, bonusNumber);

      return winningLotto;
    });
  }

  async #askWinningNumbers() {
    return await this.#retry(async () => {
      const inputWinningNumber = await this.#input.readLineAsync(
        INPUT_MESSAGE.WINNING_NUMBER,
      );
      const winningNumbers = parseNumbers(inputWinningNumber);
      return new Lotto(winningNumbers);
    });
  }

  async #askMoney() {
    return await this.#retry(async () => {
      const inputMoney = await this.#input.readLineAsync(
        INPUT_MESSAGE.PURCHASE_AMOUNT,
      );

      const money = new Money(Number(inputMoney));

      return money;
    });
  }

  async #askRetry() {
    await this.#retry(async () => {
      const askRetry = await this.#input.readLineAsync(INPUT_MESSAGE.ASK_RETRY);
      if (askRetry === "y" || askRetry === "Y") return await this.run();
      if (askRetry === "n" || askRetry === "N") return;

      throw new Error(ERROR_MESSAGE.NOT_INPUT_RETRY);
    });
  }

  async #retry(task) {
    while (true) {
      try {
        return await task();
      } catch (e) {
        console.log(e.message);
      }
    }
  }
}

export default App;

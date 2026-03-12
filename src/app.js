import Input from "./view/Input.js";
import Output from "./view/Output.js";
import ConsoleInput from "./view/ConsoleInput.js";
import ConsoleOutput from "./view/ConsoleOutput.js";
import LottoStore from "./model/LottoStore.js";
import Money from "./model/Money.js";
import Lotto from "./model/Lotto.js";
import WinningLotto from "./model/WinningLotto.js";
import { ERROR_MESSAGE } from "./constant/message.js";

class App {
  #view;
  #lottoStore;

  constructor({ input, output, lottoStore } = {}) {
    if (input) this.validateInput(input);
    if (output) this.validateOutput(output);

    this.#view = {
      input: input ?? new ConsoleInput(),
      output: output ?? new ConsoleOutput(),
    };

    this.#lottoStore = lottoStore ?? new LottoStore();
  }

  async run() {
    await this.playLotto();

    while (await this.#askRetry()) {
      await this.playLotto();
    }
  }

  async playLoop() {
    do {
      await this.playLotto();
    } while (await this.#askRetry());
  }

  async playLotto() {
    const money = await this.#askMoney();
    const lottos = this.#lottoStore.issuedLottos(money.getMoney());
    this.#view.output.printPurchasedLottos(lottos);

    const winningLotto = await this.#askWinningNumberAndBonus();

    const lottoGameResult = winningLotto.evaluateLottos(lottos);
    const returnOnInvestment = lottoGameResult.getReturnOnInvestment(
      money.getMoney(),
    );
    this.#view.output.printResult(
      lottoGameResult.getCounts(),
      returnOnInvestment,
    );
  }

  validateInput(InputClass) {
    if (!(InputClass instanceof Input)) {
      throw new Error(ERROR_MESSAGE.INVALID_INPUT);
    }
  }

  validateOutput(OutputClass) {
    if (!(OutputClass instanceof Output)) {
      throw new Error(ERROR_MESSAGE.INVALID_OUTPUT);
    }
  }

  async #askWinningNumberAndBonus() {
    return await this.#retryUntilSuccess(async () => {
      const { winningNumbersInput, bonusNumberInput } = await this.#view.input.readWinningNumberAndBonusAsync();
      const winningNumbers = winningNumbersInput.split(',').map(Number);
      const bonusNumber = Number(bonusNumberInput);
      
      return new WinningLotto(new Lotto(winningNumbers), bonusNumber);
    });
  }

  async #askMoney() {
    return await this.#retryUntilSuccess(async () => {
      const inputMoney = await this.#view.input.readMoneyAsync();

      const money = new Money(Number(inputMoney));

      return money;
    });
  }

  async #askRetry() {
    return await this.#retryUntilSuccess(async () => {
      const askRetry = await this.#view.input.readRetryAsync();

      if (askRetry === "y" || askRetry === "Y") return true;
      if (askRetry === "n" || askRetry === "N") return false;
      throw new Error(ERROR_MESSAGE.NOT_INPUT_RETRY);
    });
  }

  async #retryUntilSuccess(task) {
    while (true) {
      try {
        return await task();
      } catch (e) {
        this.#view.output.printError(e.message);
      }
    }
  }
}

export default App;

import Console from "../utils/Console.js";
import Validator from "../utils/Validator.js";
import { InputView, OutputView } from "../view/ConsoleView.js";
import Lotto from "../domain/Lotto.js";
import Lottos from "../domain/Lottos.js";
import Random from "../utils/Random.js";
import { MESSAGES, SETTINGS, ERROR_MESSAGE } from "../constants/Config.js";

class ConsoleController {
  #winningLotto;
  #bonusNumber;
  #lottoArray;

  constructor() {
    this.#winningLotto = [];
    this.#bonusNumber = 0;
    this.#lottoArray = [];
  }

  async play() {
    await this.getBuyMoney();
    await this.getWinningNumbers();
    await this.getBonusNumber();
    await this.getRetryInput();
  }

  async getBuyMoney() {
    const buyMoney = await InputView.inputMoney(MESSAGES.INPUT_MONEY);
    try {
      this.validateBuyMoney(buyMoney);
      this.createLotto(parseInt(buyMoney / SETTINGS.DIVIDE_MONEY_VALUE));
      this.printLottos(buyMoney / SETTINGS.DIVIDE_MONEY_VALUE);
    } catch (e) {
      Console.print(e);
      await this.getBuyMoney();
    }
  }

  createLotto(lottoAmount) {
    for (let i = 0; i < lottoAmount; i++) {
      const lotto = new Lotto(Random.getnerateRandomNumbers());
      this.#lottoArray.push(lotto);
    }
  }

  printLottos(lottoAmount) {
    OutputView.printLottoAmount(lottoAmount);
    OutputView.printLottos(this.#lottoArray);
  }

  validateBuyMoney(buyMoney) {
    Validator.isNumber(buyMoney);
    Validator.isDividedByThousand(buyMoney);
    Validator.isPositiveInteger(buyMoney);
  }

  async getWinningNumbers() {
    const winningNumbers = await InputView.inputWinningNumbers(
      MESSAGES.INPUT_WINNING_NUMBERS
    );
    this.#winningLotto = this.convertStringToNumber(winningNumbers.split(","));
    try {
      this.validateWinningNumbers();
    } catch (e) {
      Console.print(e);
      await this.getWinningNumbers();
    }
  }

  convertStringToNumber(strings) {
    return strings.map((str) => {
      return Number(str);
    });
  }

  validateWinningNumbers() {
    Validator.isDuplicatedNumber(this.#winningLotto);
    Validator.isCorrectLength(this.#winningLotto);
    for (let i = 0; i < this.#winningLotto.length; i++) {
      this.checkEachNumber(this.#winningLotto[i]);
    }
  }

  checkEachNumber(eachNumber) {
    Validator.isNumber(eachNumber);
    Validator.isCorrectRange(eachNumber);
    Validator.isPositiveInteger(eachNumber);
  }

  async getBonusNumber() {
    const bonusNumber = await InputView.inputBonusNumber(
      MESSAGES.INPUT_BONUSNUMBER
    );
    try {
      this.#bonusNumber = Number(bonusNumber);
      this.validateBonusNumber();
      this.checkEachNumber(this.#bonusNumber);
      this.compareLottos();
    } catch (e) {
      Console.print(e);
      await this.getBonusNumber();
    }
  }

  validateBonusNumber() {
    Validator.hasBonusNumber(this.#bonusNumber, this.#winningLotto);
  }

  compareLottos() {
    const lottos = new Lottos(this.#lottoArray);

    lottos.getLottos().forEach((lotto) => {
      lotto.compareNumbers(this.#winningLotto);
      lotto.checkBonusNumber(this.#bonusNumber);
    });

    lottos.compareLottosScore();
    this.printResult(lottos);
  }

  printResult(lottos) {
    OutputView.printResultMessage();
    OutputView.printLottoResults(lottos);

    lottos.calculateBenefit();
    OutputView.printTotalBenefit(lottos);
  }

  async getRetryInput() {
    const retryInput = await InputView.inputRetry(MESSAGES.INPUT_RETRY);
    try {
      const retryInputCommand = retryInput.toLowerCase();
      this.validateRetryInput(retryInputCommand);
      this.retryLottoGame(retryInputCommand);
    } catch (e) {
      Console.print(e);
      await this.getRetryInput();
    }
  }

  retryLottoGame(retryInputCommand) {
    if (retryInputCommand === SETTINGS.RETRY_INPUT) {
      const consoleController = new ConsoleController();
      consoleController.play();
    }
    if (retryInputCommand === SETTINGS.CLOSE_INPUT) {
      Console.close();
    }
  }

  validateRetryInput(retryInputCommand) {
    Validator.isCorrectRetryInput(retryInputCommand);
  }
}

export default ConsoleController;

import Console from "./utils/Console.js";
import Validator from "../src/utils/Validator.js";
import InputView from "./view/InputView.js";
import Lotto from "./domain/Lotto.js";
import Lottos from "./domain/Lottos.js";
import Random from "./utils/Random.js";
import OutputView from "./view/OutputView.js";
import { MESSAGES, SETTINGS, ERROR_MESSAGE } from "../src/constants/Config.js";

class App {
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
    if (!Validator.isNumber(buyMoney)) {
      throw new Error(ERROR_MESSAGE.NUMBER_TYPE);
    }
    if (!Validator.isDividedByThousand(buyMoney)) {
      throw new Error(ERROR_MESSAGE.MONEY_UNIT);
    }
    if (!Validator.isPositiveInteger(buyMoney)) {
      throw new Error(ERROR_MESSAGE.POSITIVE_INTEGER);
    }
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
    if (!Validator.isDuplicatedNumber(this.#winningLotto)) {
      throw new Error(ERROR_MESSAGE.DUPLICATED_NUMBER);
    }
    if (Validator.isCorrectLength(this.#winningLotto)) {
      throw new Error(ERROR_MESSAGE.WINNING_NUMBER_LENGTH);
    }
    for (let i = 0; i < this.#winningLotto.length; i++) {
      this.checkEachNumber(this.#winningLotto[i]);
    }
  }

  checkEachNumber(eachNumber) {
    if (!Validator.isNumber(eachNumber)) {
      throw new Error(ERROR_MESSAGE.NUMBER_TYPE);
    }
    if (!Validator.isCorrectRange(eachNumber)) {
      throw new Error(ERROR_MESSAGE.CORRECT_NUMBER_RANGE);
    }
    if (!Validator.isPositiveInteger(eachNumber)) {
      throw new Error(ERROR_MESSAGE.POSITIVE_INTEGER);
    }
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
    if (Validator.hasBonusNumber(this.#bonusNumber, this.#winningLotto)) {
      throw new Error(ERROR_MESSAGE.HAS_BONUS_NUMBER);
    }
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
      this.validateRetryInput(retryInput);
      this.retryLottoGame(retryInput);
    } catch (e) {
      Console.print(e);
      await this.getRetryInput();
    }
  }

  retryLottoGame(retryInput) {
    if (retryInput.toLowerCase() === SETTINGS.RETRY_INPUT) {
      const app = new App();
      app.play();
    }
    if (retryInput.toLowerCase() === SETTINGS.CLOSE_INPUT) {
      Console.close();
    }
  }

  validateRetryInput(retryInput) {
    if (!Validator.isCorrectRetryInput(retryInput)) {
      throw new Error(ERROR_MESSAGE.CORRECT_RETRY_INPUT);
    }
  }
}

export default App;

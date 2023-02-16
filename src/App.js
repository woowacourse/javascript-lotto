import Console from "./Console.js";
import Validations from "./Validations.js";
import InputView from "./view/InputView.js";
import Lotto from "./Lotto.js";
import Lottos from "./Lottos.js";
import Random from "./Random.js";
import OutputView from "./OutputView.js";
import { Messages, Settings, Error } from "./Config.js";

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
    const buyMoney = await InputView.inputMoney(Messages.INPUT_MONEY);
    try {
      this.validateBuyMoney(buyMoney);
      this.createLotto(parseInt(buyMoney / Settings.DIVIDE_MONEY_VALUE));
      this.printLottos(buyMoney / Settings.DIVIDE_MONEY_VALUE);
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
    if (!Validations.isNumber(buyMoney)) {
      throw new Error(Error.NUMBER_TYPE);
    }
    if (!Validations.isDividedByThousand(buyMoney)) {
      throw new Error(Error.MONEY_UNIT);
    }
    if (!Validations.isPositiveInteger(buyMoney)) {
      throw new Error(Error.POSITIVE_INTEGER);
    }
  }

  async getWinningNumbers() {
    const winningNumbers = await InputView.inputWinningNumbers(
      Messages.INPUT_WINNING_NUMBERS
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
    const numberArr = strings.map((str) => {
      return Number(str);
    });
    return numberArr;
  }

  validateWinningNumbers() {
    for (let i = 0; i < this.#winningLotto.length; i++) {
      this.checkEachNumber(this.#winningLotto[i]);
    }
  }

  checkEachNumber(eachNumber) {
    if (!Validations.isNumber(eachNumber)) {
      throw new Error(Error.NUMBER_TYPE);
    }
    if (!Validations.isCorrectRange(eachNumber)) {
      throw new Error(Error.CORRECT_NUMBER_RANGE);
    }
    if (!Validations.isPositiveInteger(eachNumber)) {
      throw new Error(Error.POSITIVE_INTEGER);
    }
  }

  async getBonusNumber() {
    const bonusNumber = await InputView.inputBonusNumber(
      Messages.INPUT_BONUSNUMBER
    );
    this.#bonusNumber = Number(bonusNumber);
    try {
      this.validateBonusNumber();
      this.checkEachNumber(this.#bonusNumber);
      this.compareLottos();
    } catch (e) {
      Console.print(e);
      await this.getBonusNumber();
    }
  }

  validateBonusNumber() {
    if (Validations.hasBonusNumber(this.#bonusNumber, this.#winningLotto)) {
      throw new Error(Error.HAS_BONUS_NUMBER);
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
    const retryInput = await InputView.inputRetry(Messages.INPUT_RETRY);
    try {
      this.validateRetryInput(retryInput);
      this.retryLottoGame(retryInput);
    } catch (e) {
      Console.print(e);
      await this.getRetryInput();
    }
  }

  retryLottoGame(retryInput) {
    if (
      retryInput === Settings.RETRY_INPUT ||
      retryInput === Settings.RETRY_INPUT_CAPITAL
    ) {
      const app = new App();
      app.play();
    }
    if (
      retryInput === Settings.CLOSE_INPUT ||
      retryInput === Settings.CLOSE_INPUT_CAPITAL
    ) {
      Console.close();
    }
  }

  validateRetryInput(retryInput) {
    if (!Validations.isCorrectRetryInput(retryInput)) {
      throw new Error(Error.CORRECT_RETRY_INPUT);
    }
  }
}

export default App;

import Console from "./util/Console.js";
import Validations from "./Validations.js";
import InputView from "./view/InputView.js";
import Lotto from "./domain/Lotto.js";
import Lottos from "./domain/Lottos.js";
import Random from "./util/Random.js";
import OutputView from "./view/OutputView.js";
import Error from "./constants/Error.js";
import View from "./constants/View.js";
import Constant from "./constants/Lotto.js";

class App {
  constructor() {
    this.winningLotto = [];
    this.bonusNumber = 0;
    this.lottos = [];
  }

  async play() {
    await this.getBuyMoney();
    await this.getWinningNumbers();
    await this.getBonusNumber();
    await this.getRetryInput();
  }

  async getBuyMoney() {
    const buyMoney = await InputView.inputMoney(View.INPUT_MONEY);
    try {
      this.validateBuyMoney(buyMoney);
      this.createLotto(parseInt(buyMoney / 1000));
    } catch (e) {
      Console.print(e);
      await this.getBuyMoney();
    }
  }

  createLotto(lottoAmount) {
    const createdLottos = [];
    for (let i = 0; i < lottoAmount; i++) {
      const lotto = new Lotto(Random.getCorrectRandomNumbers());
      createdLottos.push(lotto);
    }
    this.lottos = new Lottos(createdLottos);
    this.printLottos(lottoAmount);
  }

  printLottos(lottoAmount) {
    OutputView.printLottoAmount(lottoAmount);
    OutputView.printLottos(this.lottos.getLottos());
  }

  validateBuyMoney(buyMoney) {
    if (!Validations.isNumber(buyMoney)) {
      throw new Error(Error.INPUT_NUMBER);
    }
    if (!Validations.isDevidedByThousand(buyMoney)) {
      throw new Error(Error.INPUT_NUMBER_DEVIDED_BY_THOUSAND);
    }
    if (!Validations.isPositiveInteger(buyMoney)) {
      throw new Error(Error.INPUT_POSITIVE_INTEGER_MONEY);
    }
  }

  async getWinningNumbers() {
    const winningNumbers = await InputView.inputWinningNumbers(
      View.INPUT_WINNING_LOTTO
    );
    this.winningLotto = this.convertStringToNumber(winningNumbers.split(","));
    try {
      this.validateWinningNumbers();
    } catch (e) {
      Console.print(e);
      await this.getWinningNumbers();
    }
  }

  convertStringToNumber(strings) {
    const numbers = strings.map((string) => {
      return Number(string);
    });
    return numbers;
  }

  validateWinningNumbers() {
    if (!Validations.isCorrectLength(this.winningLotto)) {
      throw new Error(Error.INPUT_SIX_NUMBERS);
    }
    for (let i = 0; i < this.winningLotto.length; i++) {
      this.checkEachNumber(this.winningLotto[i]);
    }
  }

  checkEachNumber(eachNumber) {
    if (!Validations.isNumber(eachNumber)) {
      throw new Error(Error.INPUT_NUMBER);
    }
    if (!Validations.isCorrectRange(eachNumber)) {
      throw new Error(Error.INPUT_CORRECT_RANGE_NUMBER);
    }
    if (!Validations.isPositiveInteger(eachNumber)) {
      throw new Error(Error.INPUT_POSITIVE_INTEGER_LOTTO);
    }
  }

  async getBonusNumber() {
    const bonusNumber = await InputView.inputBonusNumber(
      View.INPUT_BONUS_NUMBER
    );
    this.bonusNumber = Number(bonusNumber);
    try {
      this.validateBonusNumber();
      this.checkEachNumber(this.bonusNumber);
      this.compareLottos();
    } catch (e) {
      Console.print(e);
      await this.getBonusNumber();
    }
  }

  validateBonusNumber() {
    if (Validations.hasBonusNumber(this.bonusNumber, this.winningLotto)) {
      throw new Error(Error.INPUT_NOT_DUPLICATED_NUMBER);
    }
  }

  compareLottos() {
    this.lottos.getLottos().forEach((lotto) => {
      lotto.compareNumbers(this.winningLotto);
      lotto.checkBonusNumber(this.bonusNumber);
    });
    this.lottos.compareLottosScore();
    this.printResult();
  }

  printResult() {
    OutputView.printResultMessage();
    OutputView.printLottoResults(this.lottos);
    OutputView.printTotalBenefit(this.lottos.getBenefitRate());
  }

  async getRetryInput() {
    const retryInput = await InputView.inputRetry(View.INPUT_RETYR);
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
      retryInput === Constant.RETRY_DOWNER ||
      retryInput === Constant.RETRY_UPPER
    ) {
      this.resetGame();
      this.play();
    }
    if (
      retryInput === Constant.QUIT_DOWNER ||
      retryInput === Constant.QUIT_UPPER
    ) {
      Console.close();
    }
  }

  resetGame() {
    this.lottos.resetLottos();
    this.lottoArray = [];
  }

  validateRetryInput(retryInput) {
    if (!Validations.isCorrectRetryInput(retryInput)) {
      throw new Error(Error.INPUT_CORRECT_RETRY);
    }
  }
}

export default App;

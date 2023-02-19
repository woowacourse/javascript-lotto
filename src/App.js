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

  async play() {
    const buyMoney = await this.getBuyMoney();
    const lottos = await this.createLotto(parseInt(buyMoney / 1000));
    this.printLottos(lottos.getLottos())
    const winningLotto = await this.getWinningLotto();
    const bonusNumber = await this.getBonusNumber(winningLotto);
    this.compareLottos(lottos, winningLotto, bonusNumber)
    this.printResult(lottos)
    const retryInput = await this.getRetryInput(lottos);
    this.retryLottoGame(retryInput,lottos)
  }

  async getBuyMoney() {
    const buyMoney = await InputView.inputMoney(View.INPUT_MONEY);
    try {
      this.validateBuyMoney(buyMoney);
    } catch (e) {
      Console.print(e);
      await this.getBuyMoney();
    }
    return buyMoney
  }

  async createLotto(lottoAmount) {
    const lottos = Array.from({ length: lottoAmount }, () => new Lotto(Random.getCorrectRandomNumbers()))
    console.log(lottos)
    return new Lottos(lottos)
  }

  printLottos(lottos) {
    OutputView.printLottoAmount(lottos.length);
    OutputView.printLottos(lottos);
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

  async getWinningLotto() {
    const winningNumbers = await InputView.inputWinningNumbers(
      View.INPUT_WINNING_LOTTO
    );
    const winningLotto = this.convertStringToNumber(winningNumbers.split(","));
    try {
      this.validateWinningNumbers(winningLotto);
    } catch (e) {
      Console.print(e);
      await this.getWinningLotto();
    }
    return winningLotto
  }

  convertStringToNumber(strings) {
    const numbers = strings.map((string) => {
      return Number(string);
    });
    return numbers;
  }

  validateWinningNumbers(winningLotto) {
    if (!Validations.isCorrectLength(winningLotto)) {
      throw new Error(Error.INPUT_SIX_NUMBERS);
    }
    for (let i = 0; i < winningLotto.length; i++) {
      this.checkEachNumber(winningLotto[i]);
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

  async getBonusNumber(winningLotto) {
    const bonusInput = await InputView.inputBonusNumber(
      View.INPUT_BONUS_NUMBER
    );
    const bonusNumber = Number(bonusInput);
    try {
      this.validateBonusNumber(bonusNumber,winningLotto);
      this.checkEachNumber(bonusNumber);
    } catch (e) {
      Console.print(e);
      await this.getBonusNumber();
    }
    return bonusNumber
  }

  validateBonusNumber(bonusNumber,winningLotto) {
    if (Validations.hasBonusNumber(bonusNumber, winningLotto)) {
      throw new Error(Error.INPUT_NOT_DUPLICATED_NUMBER);
    }
  }

  compareLottos(lottos,winningLotto,bonusNumber) {
    lottos.getLottos().forEach((lotto) => {
      lotto.compareNumbers(winningLotto);
      lotto.checkBonusNumber(bonusNumber);
    });
    lottos.compareLottosScore();
  }

  printResult(lottos) {
    OutputView.printResultMessage();
    OutputView.printLottoResults(lottos);
    OutputView.printTotalBenefit(lottos.getBenefitRate());
  }

  async getRetryInput() {
    const retryInput = await InputView.inputRetry(View.INPUT_RETYR);
    try {
      this.validateRetryInput(retryInput);
    } catch (e) {
      Console.print(e);
      await this.getRetryInput();
    }
  }

  retryLottoGame(retryInput,lottos) {
    if (
      retryInput === Constant.RETRY_DOWNER ||
      retryInput === Constant.RETRY_UPPER
    ) {
      this.resetGame(lottos);
      this.play();
    }
    if (
      retryInput === Constant.QUIT_DOWNER ||
      retryInput === Constant.QUIT_UPPER
    ) {
      Console.close();
    }
  }

  resetGame(lottos) {
    lottos.resetLottos();
  }

  validateRetryInput(retryInput) {
    if (!Validations.isCorrectRetryInput(retryInput)) {
      throw new Error(Error.INPUT_CORRECT_RETRY);
    }
  }
}

export default App;

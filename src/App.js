import Console from "./Console.js";
import Validations from "./Validations.js";
import InputView from "./view/InputView.js";
import Lotto from "./Lotto.js";
import Lottos from "./Lottos.js";
import Random from "./Random.js";
import OutputView from "./OutputView.js";
import { Messages, Error } from "./Config.js";

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
      this.createLotto(parseInt(buyMoney / 1000));
      this.printLottos(buyMoney / 1000);
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
    if (!Validations.isDevidedByThousand(buyMoney)) {
      throw new Error(Error.MONEY_UNIT);
    }
    if (!Validations.isPositiveInteger(buyMoney)) {
      throw new Error(Error.POSITIVE_INTEGER);
    }
  }

  async getWinningNumbers() {
    const winningNumbers = await InputView.inputWinningNumbers(
      "당첨 번호를 입력해 주세요."
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
      throw new Error("숫자만 입력할 수 있습니다.");
    }
    if (!Validations.isCorrectRange(eachNumber)) {
      throw new Error("당첨번호는 1~45까지의 범위입니다.");
    }
    if (!Validations.isPositiveInteger(eachNumber)) {
      throw new Error("당첨번호는 양의 정수여야 합니다.");
    }
  }

  async getBonusNumber() {
    const bonusNumber = await InputView.inputBonusNumber(
      "보너스 번호를 입력해 주세요."
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
      throw new Error("보너스 번호는 당첨번호와 중복되지 않아야합니다.");
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
    const retryInput = await InputView.inputRetry(
      "다시 시작하시겠습니까? (y/n)."
    );
    try {
      this.validateRetryInput(retryInput);
      this.retryLottoGame(retryInput);
    } catch (e) {
      Console.print(e);
      await this.getRetryInput();
    }
  }

  retryLottoGame(retryInput) {
    if (retryInput === "y" || retryInput === "Y") {
      const app = new App();
      app.play();
    }
    if (retryInput === "n" || retryInput === "N") {
      Console.close();
    }
  }

  validateRetryInput(retryInput) {
    if (!Validations.isCorrectRetryInput(retryInput)) {
      throw new Error("재시작은 y, 종료는 n을 입력해주세요.");
    }
  }
}

export default App;

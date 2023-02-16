import Console from "./util/Console.js";
import Validations from "./Validations.js";
import InputView from "./view/InputView.js";
import Lotto from "./domain/Lotto.js";
import Lottos from "./domain/Lottos.js";
import Random from "./util/Random.js";
import OutputView from "./view/OutputView.js";

class App {

  constructor() {
    this.winningLotto = [];
    this.bonusNumber = 0;
    this.lottos = []
  }

  async play() {
    await this.getBuyMoney();
    await this.getWinningNumbers();
    await this.getBonusNumber();
    await this.getRetryInput();
  }

  async getBuyMoney() {
    const buyMoney = await InputView.inputMoney("구입금액을 입력해 주세요.");
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
    const createdLottos = []
    for (let i = 0; i < lottoAmount; i++) {
      const randomNumbers = Random.getCorrectRandomNumbers();
      const lotto = new Lotto(randomNumbers);
      createdLottos.push(lotto);
    }
    this.lottos = new Lottos(createdLottos)
  }

  printLottos(lottoAmount) {
    OutputView.printLottoAmount(lottoAmount);
    OutputView.printLottos(this.lottos.getLottos());
  }

  validateBuyMoney(buyMoney) {
    if (!Validations.isNumber(buyMoney)) {
      throw new Error("숫자만 입력할 수 있습니다.");
    }
    if (!Validations.isDevidedByThousand(buyMoney)) {
      throw new Error("1000원 단위로 입력해주세요.");
    }
    if (!Validations.isPositiveInteger(buyMoney)) {
      throw new Error("구매 금액은 양의 정수여야 합니다.");
    }
  }

  async getWinningNumbers() {
    const winningNumbers = await InputView.inputWinningNumbers(
      "당첨 번호를 입력해 주세요."
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
    const numberArr = strings.map((str) => {
      return Number(str);
    });
    return numberArr;
  }

  validateWinningNumbers() {
    if (!Validations.isCorrectLength(this.winningLotto)) {
      throw new Error("6개의 숫자를 입력해주세요.");
    }
    for (let i = 0; i < this.winningLotto.length; i++) {
      this.checkEachNumber(this.winningLotto[i]);
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
      throw new Error("보너스 번호는 당첨번호와 중복되지 않아야합니다.");
    }
  }

  compareLottos() {
    // this.lottos = new Lottos(this.lottoArray);
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
    this.lottos.calculateBenefit();
    OutputView.printTotalBenefit(this.lottos);
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
    if (retryInput === "y" || retryInput === "y") {
      this.resetGame()
      this.play();

    }
    if (retryInput === "n" || retryInput === "N") {
      Console.close();
    }
  }

  resetGame() {
    this.lottos.resetLottos()
    this.lottoArray = []
  }

  validateRetryInput(retryInput) {
    if (!Validations.isCorrectRetryInput(retryInput)) {
      throw new Error("재시작은 y, 종료는 n을 입력해주세요.");
    }
  }
}

export default App;

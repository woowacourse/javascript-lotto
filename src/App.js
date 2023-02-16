import Console from "./Console.js";
import Validations from "./Validations.js";
import InputView from "./view/InputView.js";

class App {
  #winningLotto;
  #bonusNumber;

  constructor() {
    this.#winningLotto = [];
    this.#bonusNumber = 0;
  }

  async play() {
    await this.getBuyMoney();
    Console.close();
  }

  async getBuyMoney() {
    const buyMoney = await InputView.inputMoney("구입금액을 입력해 주세요.");
    try {
      this.validateBuyMoney(buyMoney);
    } catch (e) {
      Console.print(e);
      await this.getBuyMoney();
    }
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
    this.#winningLotto = winningNumbers.split(",");
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
      throw new Error("당첨번호는 양의 정수여야 합니다.")
    }
  }

  async getBonusNumber() {
    const bonusNumber = await InputView.inputBonusNumber(
      "보너스 번호를 입력해 주세요."
    );
    this.#bonusNumber = Number(bonusNumber);
  }
}

export default App;

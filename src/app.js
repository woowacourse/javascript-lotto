import Validator from "./Validator/validator.js";
import InputHandler from "./view/InputHandler.js";

class App {
  async getPurchaseMoney() {
    return InputHandler({
      inputMessage: "> 구입금액을 입력해 주세요. ",
      parser: Number,
      validator: Validator.validatePurchaseMoney,
    });
  }

  async getWinningNumbers() {
    return InputHandler({
      inputMessage: "> 당첨 번호를 입력해 주세요. ",
      parser: (input) => input.split(",").map((string) => Number(string)),
      validator: Validator.validateWinningNumbers,
    });
  }

  async getBonusNumber(winningNumbers) {
    return InputHandler({
      inputMessage: "> 보너스 번호를 입력해 주세요. ",
      parser: Number,
      validator: (bonusNumber) =>
        Validator.validateBonusNumber(winningNumbers, bonusNumber),
    });
  }

  async run() {
    const money = await this.getPurchaseMoney();
    const winningNumbers = await this.getWinningNumbers();
    const bonusNumber = await this.getBonusNumber(winningNumbers);
  }
}

export default App;

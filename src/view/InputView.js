import InputHandler from "./InputHandler.js";
import Validator from "../Validator/validator.js";

class InputView {
  static async getPurchaseMoney() {
    return InputHandler({
      inputMessage: "> 구입금액을 입력해 주세요. ",
      parser: Number,
      validator: Validator.validatePurchaseMoney,
    });
  }

  static async getWinningNumbers() {
    return InputHandler({
      inputMessage: "> 당첨 번호를 입력해 주세요. ",
      parser: (input) => input.split(",").map((string) => Number(string)),
      validator: Validator.validateWinningNumbers,
    });
  }

  static async getBonusNumber(winningNumbers) {
    return InputHandler({
      inputMessage: "> 보너스 번호를 입력해 주세요. ",
      parser: Number,
      validator: (bonusNumber) =>
        Validator.validateBonusNumber(winningNumbers, bonusNumber),
    });
  }

  static async getRestartRequest() {
    return InputHandler({
      inputMessage: "> 다시 시작하시겠습니까? (y/n)",
      validator: Validator.validateRestartRequest,
    });
  }
}

export default InputView;

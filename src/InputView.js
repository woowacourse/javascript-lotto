import readline from "readline/promises";
import ERROR_MESSAGE from "./constants/errorMessage.js";

class InputView {
  async getUserInput(message) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const input = await rl.question(message);
    rl.close();
    return input;
  }

  async askAmount() {
    const MESSAGE = "> 구입금액을 입력해 주세요. ";
    const input = await this.getUserInput(MESSAGE);
    this.validateAmount(input);
    return Number(input);
  }

  async askWinningNumbers() {
    const MESSAGE = "> 당첨 번호를 입력해 주세요. ";
    const input = await this.getUserInput(MESSAGE);
    this.validateWinningNumbers(input);
    return input.split(",").map(Number);
  }

  async askBonusNumber() {
    const MESSAGE = "> 보너스 번호를 입력해 주세요. ";
    const input = await this.getUserInput(MESSAGE);
    this.validateBonusNumber(input);
    return Number(input);
  }

  async askRetry() {
    const MESSAGE = "> 다시 시작하시겠습니까? (y/n) ";
    const input = await this.getUserInput(MESSAGE);
    this.validateRetry(input);
    return input;
  }

  validateAmount(userInput) {
    const amountNumber = Number(userInput);
    if (Number.isNaN(amountNumber) || amountNumber <= 0) {
      throw new Error(ERROR_MESSAGE.AMOUNT.POSITIVE);
    }
  }

  validateWinningNumbers(userInput) {
    const winningNumbers = userInput.split(",").map(Number);
    if (winningNumbers.some((number) => Number.isNaN(number))) {
      throw new Error(ERROR_MESSAGE.WINNING_NUMBER.NUMBER);
    }
  }

  validateBonusNumber(userInput) {
    const bonusNumber = Number(userInput);
    if (Number.isNaN(bonusNumber)) {
      throw new Error(ERROR_MESSAGE.BONUS_NUMBER.NUMBER);
    }
  }

  validateRetry(userInput) {
    if (userInput !== "y" && userInput !== "n") {
      throw new Error(ERROR_MESSAGE.RETRY.INPUT);
    }
  }
}

export default InputView;

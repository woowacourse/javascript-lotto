import readline from "readline/promises";

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
    return await this.getUserInput(MESSAGE);
  }

  async askBonusNumber() {
    const MESSAGE = "> 보너스 번호를 입력해 주세요. ";
    return await this.getUserInput(MESSAGE);
  }

  async askRetry() {
    const MESSAGE = "> 다시 시작하시겠습니까? (y/n)";
    return await this.getUserInput(MESSAGE);
  }

  validateAmount(amount) {
    const amountNumber = Number(amount);
    if (Number.isNaN(amountNumber) || amountNumber <= 0) {
      throw new Error();
    }
  }
}

export default InputView;

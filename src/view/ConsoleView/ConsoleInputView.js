import readline from "readline";
import MESSAGES from "./constants/messages";

class ConsoleInputView {
  static async readBuyPrice() {
    const buyPrice = await this.#readLineAsync(MESSAGES.INPUT.buyPrice);
    return buyPrice;
  }

  static async readWinningNumbers() {
    const winningNumbers = await this.#readLineAsync(
      MESSAGES.INPUT.winningNumbers
    );
    return winningNumbers;
  }

  static async readBonusNumber() {
    const bonusNumber = await this.#readLineAsync(MESSAGES.INPUT.bonusNumber);
    return bonusNumber;
  }

  static async readRetryChecker() {
    const retryChecker = await this.#readLineAsync(MESSAGES.INPUT.retryChecker);
    return retryChecker;
  }

  // eslint-disable-next-line
  static #readLineAsync(query) {
    const inputQuery = `> ${query}`;
    // eslint-disable-next-line
    return new Promise((resolve, reject) => {
      if (arguments.length !== 1) {
        reject(new Error("arguments must be 1"));
      }

      if (typeof query !== "string") {
        reject(new Error("query must be string"));
      }

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question(inputQuery, (input) => {
        rl.close();
        resolve(input);
      });
    });
  }
}

export default ConsoleInputView;

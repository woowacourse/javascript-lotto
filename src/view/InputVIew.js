import readline from "readline";
import MESSAGES from "../constants/messages.js";

class InputView {
  static async readBuyAmount() {
    return await this.#readLineAsync(MESSAGES.INPUT.buyAmount);
  }

  static async readWinningNumbers() {
    return await this.#readLineAsync(MESSAGES.INPUT.winningNumbers);
  }

  static async readBonusNumber() {
    return await this.#readLineAsync(MESSAGES.INPUT.bonusNumber);
  }

  static async readRetryChecker() {
    return await this.#readLineAsync(MESSAGES.INPUT.retryChecker);
  }

  static #readLineAsync(query) {
    const inputQuery = `> ${query}`;
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

export default InputView;

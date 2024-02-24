import readline from "readline";
import { INPUT_MESSAGE } from "../constants/messages.js";

class InputView {
  static async readBuyAmount() {
    return await this.#readLineAsync(INPUT_MESSAGE.buyAmount);
  }

  static async readWinningNumbers() {
    return await this.#readLineAsync(INPUT_MESSAGE.winningNumbers);
  }

  static async readBonusNumber() {
    return await this.#readLineAsync(INPUT_MESSAGE.bonusNumber);
  }

  static async readRetryChecker() {
    return await this.#readLineAsync(INPUT_MESSAGE.retryChecker);
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

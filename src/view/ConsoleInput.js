import readline from "readline";
import Input from "./Input.js";
import { INPUT_MESSAGE } from "../constant/message.js";

class ConsoleInput extends Input {
  constructor() {
    super();
  }

  async readMoneyAsync() {
    return await this.#readLineAsync(INPUT_MESSAGE.PURCHASE_AMOUNT);
  }

  async readWinningNumberAndBonusAsync() {
    const winningNumbersInput = await this.#readLineAsync(INPUT_MESSAGE.WINNING_NUMBER);

    const bonusNumberInput = await this.#readLineAsync(INPUT_MESSAGE.BONUS_NUMBER);

    return { winningNumbersInput, bonusNumberInput };
  }

  async readRetryAsync() {
    return await this.#readLineAsync(INPUT_MESSAGE.ASK_RETRY);
  }
  
  async #readLineAsync(message) {
    return new Promise((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question(message ?? "", (line) => {
        rl.close();
        resolve(line);
      });
    });
  }
}

export default ConsoleInput;

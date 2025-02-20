import readline from "readline";
import { INPUT_MESSAGE } from "../constant/Message.js";

const Input = {
  async readLineAsync(query) {
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

      rl.question(query, (input) => {
        rl.close();
        resolve(input);
      });
    });
  },
  async purchasePrice() {
    const purchasePrice = await this.readLineAsync(
      INPUT_MESSAGE.PURCHASE_PRISE
    );
    return purchasePrice;
  },

  async winningNumbers() {
    const winningNumbers = await this.readLineAsync(
      INPUT_MESSAGE.WINNING_NUMBERS
    );
    return winningNumbers;
  },

  async bonusNumber() {
    const bonusNumber = await this.readLineAsync(INPUT_MESSAGE.BONUS_NUMBER);
    return bonusNumber;
  },

  async restart() {
    const restart = await this.readLineAsync(INPUT_MESSAGE.RESTART);
    return restart;
  },
};

export default Input;

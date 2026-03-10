import { Console } from "@woowacourse/mission-utils";
import { INFO, ERROR } from "../constants/messages.js";
import { ANSWER } from "../constants/rules.js";

class ConsoleInputView {
  static async #readLine(message) {
    return await Console.readLineAsync(message);
  }

  static #readYesOrNo(answer) {
    const lowerAnswer = answer.toLowerCase().trim();
    if (ANSWER.YES === lowerAnswer) return true;
    if (ANSWER.NO === lowerAnswer) return false;
    throw new Error(ERROR.INVALID_YES_OR_NO);
  }

  static async readPurchaseAmount() {
    const input = await this.#readLine(INFO.PURCHASE_AMOUNT);
    return Number(input);
  }

  static async readWinningNumbers() {
    const input = await this.#readLine(INFO.WINNING_NUMBERS);
    return input.split(",").map((v) => Number(v.trim()));
  }

  static async readBonusNumber() {
    const input = await this.#readLine(INFO.BONUS_NUMBER);
    return Number(input);
  }

  static async readIsRetry() {
    const input = await this.#readLine(INFO.ASK_RETRY);
    return this.#readYesOrNo(input);
  }
}

export default ConsoleInputView;

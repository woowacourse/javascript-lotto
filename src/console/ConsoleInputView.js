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
    return await this.#readLine(INFO.PURCHASE_AMOUNT);
  }

  static async readWinningNumbers() {
    return await this.#readLine(INFO.WINNING_NUMBERS);
  }

  static async readBonusNumber() {
    return await this.#readLine(INFO.BONUS_NUMBER);
  }

  static async readIsRetry() {
    const input = await this.#readLine(INFO.ASK_RETRY);
    return this.#readYesOrNo(input);
  }
}

export default ConsoleInputView;

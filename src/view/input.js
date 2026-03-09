import { readLine } from "../utils/readLine.js";
import { Validator } from "../validator/Validator.js";
import { OutputView } from "./output.js";

export const InputView = {
  async inputPurchaseAmount() {
    try {
      const money = await readLine("구입금액을 입력해 주세요.");
      return Number(money);
    } catch (error) {
      OutputView.outputError(error.message);
      return this.inputPurchaseAmount();
    }
  },

  async inputWinningNumber() {
    try {
      const winningNumber = await readLine("\n당첨 번호를 입력해 주세요.");
      return winningNumber;
    } catch (error) {
      OutputView.outputError(error.message);
      return this.inputWinningNumber();
    }
  },

  async inputBonusNumber(winningNumber) {
    try {
      const bonusNumber = await readLine("\n보너스 번호를 입력해 주세요.");
      return Number(bonusNumber);
    } catch (error) {
      OutputView.outputError(error.message);
      return this.inputBonusNumber(winningNumber);
    }
  },

  async inputRetry() {
    try {
      const retry = await readLine("\n다시 시작하시겠습니까? (y/n)");
      Validator.validateRetry(retry);
      return retry;
    } catch (error) {
      OutputView.outputError(error.message);
      return this.inputRetry();
    }
  },
};

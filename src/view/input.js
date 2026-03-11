import { Validator } from "../validator/Validator.js";
import { OutputView } from "./output.js";

export const InputView = {
  readerObject: null,

  setReader(reader) {
    this.readerObject = reader;
  },

  async inputPurchaseAmount() {
    try {
      const money = await this.readerObject.readPurchaseMoney();
      Validator.validatePurchaseMoney(money);
      return Number(money);
    } catch (error) {
      OutputView.outputError(error.message);
      return this.inputPurchaseAmount();
    }
  },

  async inputWinningNumber() {
    try {
      const winningNumber = await this.readerObject.readWinningNumber();
      Validator.validateWinningNumber(winningNumber);
      return winningNumber;
    } catch (error) {
      OutputView.outputError(error.message);
      return this.inputWinningNumber();
    }
  },

  async inputBonusNumber(winningNumber) {
    try {
      const bonusNumber = await this.readerObject.readBonusNumber();
      Validator.validateBonusNumber(winningNumber, Number(bonusNumber));
      return Number(bonusNumber);
    } catch (error) {
      OutputView.outputError(error.message);
      return this.inputBonusNumber(winningNumber);
    }
  },

  async inputRetry() {
    try {
      const retry = await this.readerObject.readRetry();
      Validator.validateRetry(retry);
      return retry;
    } catch (error) {
      OutputView.outputError(error.message);
      return this.inputRetry();
    }
  },
};

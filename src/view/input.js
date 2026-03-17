import { RESTART } from "../constants/constant.js";
import { Validator } from "../validator/Validator.js";
import { OutputView } from "./output.js";

export const InputView = {
  readerObject: null,

  setReader(reader) {
    this.readerObject = reader;
  },

  async inputPurchaseAmount() {
    try {
      const money = await this.readerObject.determinePurchaseMoney();
      Validator.validatePurchaseMoney(money);
      return Number(money);
    } catch (error) {
      OutputView.outputError(error.message);
      return this.inputPurchaseAmount();
    }
  },

  async inputWinningNumber() {
    try {
      const rawWinningNumber = await this.readerObject.determineWinningNumber();

      if (rawWinningNumber === RESTART) return rawWinningNumber;

      const winningNumber = Array.isArray(rawWinningNumber)
        ? rawWinningNumber.filter(Boolean).join(',')
        : rawWinningNumber;

      Validator.validateWinningNumber(winningNumber);
      return winningNumber;
    } catch (error) {
      OutputView.outputError(error.message);
      return this.inputWinningNumber();
    }
  },

  async inputBonusNumber(winningNumber) {
    try {
      const bonusNumber = await this.readerObject.determineBonusNumber();
      Validator.validateBonusNumber(winningNumber, Number(bonusNumber));
      return Number(bonusNumber);
    } catch (error) {
      OutputView.outputError(error.message);
      return this.inputBonusNumber(winningNumber);
    }
  },

  async inputRetry() {
    try {
      const retry = await this.readerObject.determineRetry();
      Validator.validateRetry(retry);
      return retry;
    } catch (error) {
      OutputView.outputError(error.message);
      return this.inputRetry();
    }
  },
};

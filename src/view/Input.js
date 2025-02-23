import { INPUT_MESSAGE } from "../constant/Message.js";
import { inputHandler } from "../util/InputHandler.js";
import Output from "./Output.js";
import Validator from "../domain/Validator.js";
import { throwError } from "../util/util.js";
import Parser from "../util/Parser.js";
import ERROR from "../constant/Error.js";

const Input = {
  async purchasePrice() {
    const purchasePrice = await inputHandler({
      promptMessage: INPUT_MESSAGE.PURCHASE_PRISE,
      parser: Parser.toNumber,
      errorName: ERROR.PURCHASE_PRICE,
      validatorMethod: Validator.purchasePrice,
    });
    Output.newLine();
    return purchasePrice;
  },

  async winningNumbers() {
    const winningNumbers = await inputHandler({
      promptMessage: INPUT_MESSAGE.WINNING_NUMBERS,
      parser: Parser.toSplitNumberArray,
      validatorMethod: Validator.winningNumbers,
      errorName: ERROR.WINNING_NUMBERS,
    });
    Output.newLine();
    return winningNumbers;
  },

  async bonusNumber(winningNumbers) {
    try {
      const bonusNumber = await inputHandler({
        promptMessage: INPUT_MESSAGE.BONUS_NUMBER,
        parser: Parser.toNumber,
        errorName: ERROR.BONUS_NUMBER,
        validatorMethod: Validator.bonusNumber,
      });
      const error = Validator.winningsAndBonus(winningNumbers, bonusNumber);
      Output.printErrorResults(error, ERROR.WINNINGS_AND_BONUS);
      throwError(error);
      Output.newLine();
      return bonusNumber;
    } catch {
      return this.bonusNumber(winningNumbers);
    }
  },
  async restartLotto() {
    const restart = await inputHandler({
      promptMessage: INPUT_MESSAGE.RESTART,
      errorName: ERROR.RESTART,
      validatorMethod: Validator.restart,
    });

    if (restart.toLowerCase() === "y") {
      return true;
    }
    return false;
  },
};

export default Input;

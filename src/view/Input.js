import readline from "readline";
import { INPUT_MESSAGE } from "../constant/Message.js";
import { inputHandler, readLineAsync } from "../util/InputHandler.js";
import Output from "./Output.js";
import Validator from "../domain/Validator.js";
import { throwError } from "../util/util.js";

const Input = {
  async purchasePrice() {
    const purchasePrice = await inputHandler({
      promptMessage: INPUT_MESSAGE.PURCHASE_PRISE,
      parser: "toNumber",
      errorName: "PURCHASE_PRICE",
      validatorMethod: "purchasePrice",
    });
    Output.newLine();
    return purchasePrice;
  },

  async inputWinningNumbers() {
    const winningNumbers = await inputHandler({
      promptMessage: INPUT_MESSAGE.WINNING_NUMBERS,
      parser: "toSplitNumberArray",
      validatorMethod: "winningNumbers",
      errorName: "WINNING_NUMBERS",
    });
    Output.newLine();
    return winningNumbers;
  },

  async inputBonus(winningNumbers) {
    try {
      const bonusNumber = await inputHandler({
        promptMessage: INPUT_MESSAGE.BONUS_NUMBER,
        parser: "toNumber",
        errorName: "BONUS_NUMBER",
        validatorMethod: "bonusNumber",
      });
      const error = Validator.winningsAndBonus(winningNumbers, bonusNumber);
      Output.printErrorResults(error, "WINNINGS_AND_BONUS");
      throwError(error);
      Output.newLine();
      return bonusNumber;
    } catch {
      return this.inputBonus(winningNumbers);
    }
  },
};

export default Input;

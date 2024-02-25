import { SYMBOL } from "../constants/condition";
import { INPUT_MESSAGE } from "../constants/message";
import readLineAsync from "../utils/readLineAsync";
import splitByDelimiter from "../utils/splitByDelimiter";

const InputView = {
  async readPurchaseAmount() {
    const input = await readLineAsync(INPUT_MESSAGE.purchaseAmount);

    return Number(input);
  },

  async readWinningNumber() {
    const input = await readLineAsync(INPUT_MESSAGE.winningNumbers);
    const refinedInput = splitByDelimiter(input, SYMBOL.delimiter);
    const inputNumbers = refinedInput.map((value) => Number(value));

    return inputNumbers;
  },

  async readBonusNumber() {
    const input = await readLineAsync(INPUT_MESSAGE.bonusNumber);

    return Number(input);
  },

  async readRetry() {
    const input = await readLineAsync(INPUT_MESSAGE.retryGame);

    return input.toLowerCase();
  },
};

export default InputView;

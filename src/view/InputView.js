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

    return refinedInput;
  },

  async readBonusNumber() {
    const input = await readLineAsync(INPUT_MESSAGE.bonusNumber);

    return Number(input);
  },
};

export default InputView;

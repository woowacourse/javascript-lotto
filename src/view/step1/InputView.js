import { INPUT_MESSAGE } from "../../constants/message";
import readLineAsync from "../../utils/readLineAsync";

const InputView = {
  async readPurchaseAmount() {
    const input = await readLineAsync(INPUT_MESSAGE.purchaseAmount);

    return input;
  },

  async readWinningNumber() {
    const input = await readLineAsync(INPUT_MESSAGE.winningNumbers);

    return input;
  },

  async readBonusNumber() {
    const input = await readLineAsync(INPUT_MESSAGE.bonusNumber);

    return input;
  },

  async readRetry() {
    const input = await readLineAsync(INPUT_MESSAGE.retryGame);

    return input;
  },
};

export default InputView;

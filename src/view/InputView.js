import { INPUT_MESSAGE } from "../constants/message";
import readLineAsync from "../utils/readLineAsync";

const InputView = {
  async readPurchaseAmount() {
    const input = await readLineAsync(INPUT_MESSAGE.purchaseAmount);

    return Number(input);
  },
};

export default InputView;

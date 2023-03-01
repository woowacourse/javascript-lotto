import Console from "../../utils/Console";
import { MESSAGE } from "../../constants";

const InputView = {
  async readPurchaseAmount() {
    const input = await Console.readLine(MESSAGE.INPUT_PURCHASE_AMOUNT);
    return input;
  },

  async readLottoNumbers() {
    const input = await Console.readLine(MESSAGE.INPUT_LOTTO_NUMBERS);
    return input;
  },

  async readBonusNumber() {
    const input = await Console.readLine(MESSAGE.INPUT_BONUS_NUMBER);
    return input;
  },

  async readRestartCommand() {
    const input = await Console.readLine(MESSAGE.INPUT_RESTART_COMMAND);
    return input.toLowerCase();
  },
};

export default InputView;

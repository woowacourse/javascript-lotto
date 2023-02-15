import { ConsoleMessage } from "../constants/Constants.js";
import Console from "../utils/Console.js";

const InputView = {
  readPurchaseAmount(callback) {
    return Console.question(ConsoleMessage.PURCHASE_AMOUNT, (input) =>
      callback(input)
    );
  },

  readWinningNumbers(callback) {
    return Console.question(ConsoleMessage.WINNING_NUMBER, (input) =>
      callback(input)
    );
  },

  readBonusNumber(callback) {
    return Console.question(ConsoleMessage.BONUS_NUMBER, (input) =>
      callback(input)
    );
  },
};

export default InputView;

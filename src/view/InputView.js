const Console = require("../utils/Console");
const { MESSAGE } = require("../constants");

const InputView = {
  readPurchaseAmount(callback) {
    Console.readLine(MESSAGE.INPUT_PURCHASE_AMOUNT, callback);
  },

  readLottoNumbers(callback) {
    Console.readLine(MESSAGE.INPUT_LOTTO_NUMBERS, callback);
  },

  readBonusNumber(callback) {
    Console.readLine(MESSAGE.INPUT_BONUS_NUMBER, callback);
  },

  readRestartCommand(callback) {
    Console.readLine(MESSAGE.INPUT_RESTART_COMMAND, callback);
  },
};

module.exports = InputView;

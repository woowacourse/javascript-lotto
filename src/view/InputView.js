const Console = require('../util/Console');
const { INPUT_MESSAGE } = require('../constant/message');

const InputView = {
  readPurchaseAmount() {
    return Console.readLine(INPUT_MESSAGE.PURCHASE_AMOUNT);
  },

  readWinningNumber() {
    return Console.readLine(INPUT_MESSAGE.WINNING_NUMBER);
  },

  readBonusNumber() {
    return Console.readLine(INPUT_MESSAGE.BONUS_NUMBER);
  },

  readRestartCommand() {
    return Console.readLine(INPUT_MESSAGE.RESTART_COMMAND);
  },
};

module.exports = InputView;

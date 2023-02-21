const Console = require('../../util/Console');
const { INPUT_MESSAGE } = require('../../constant/message');

const InputView = {
  async readPurchaseAmount() {
    const purchaseAmount = await Console.readLine(INPUT_MESSAGE.PURCHASE_AMOUNT);
    return purchaseAmount;
  },

  async readWinningNumber() {
    const winningNumber = await Console.readLine(INPUT_MESSAGE.WINNING_NUMBER);
    return winningNumber;
  },

  async readBonusNumber() {
    const bonusNumber = await Console.readLine(INPUT_MESSAGE.BONUS_NUMBER);
    return bonusNumber;
  },

  async readRestartCommand() {
    const restartCommand = await Console.readLine(INPUT_MESSAGE.RESTART_COMMAND);
    return restartCommand;
  },
};

module.exports = InputView;

const { consoleMessage } = require('../constants/constants');
const Console = require('./Console');

const inputView = {
  readPurchasePrice(callback) {
    Console.readLine(
      consoleMessage.ASK_PURCHASE_PRICE,
      (purchasePriceInput) => {
        return callback(purchasePriceInput);
      }
    );
  },
  readWinningNumbers(callback) {
    Console.readLine(
      consoleMessage.ASK_WINNING_NUMBERS,
      (winningNumbersInput) => {
        return callback(winningNumbersInput);
      }
    );
  },
  readBonusNumber(callback) {
    Console.readLine(consoleMessage.ASK_BONUS_NUMBER, (bonusNumberInput) => {
      return callback(bonusNumberInput);
    });
  },
  readRestartCommand(callback) {
    Console.readLine(
      consoleMessage.ASK_RESTART_COMMAND,
      (restartCommandInput) => {
        return callback(restartCommandInput);
      }
    );
  },
};
module.exports = inputView;

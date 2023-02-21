/*
const { CONSOLE_MESSAGE } = require('../js/constants/constants');
const Console = require('./Console');
const exceptionHandler = require('../utils/exceptionHandler');
const validator = require('../domain/validation/validator');

const inputView = {
  readPurchasePrice(callback) {
    Console.readLine(
      CONSOLE_MESSAGE.ASK_PURCHASE_PRICE,
      (purchasePriceInput) => {
        const isNormal = exceptionHandler(
          validator.purchasePrice,
          purchasePriceInput
        );
        if (isNormal) return callback(purchasePriceInput);
        return inputView.readPurchasePrice(callback);
      }
    );
  },
  readWinningNumbers(callback) {
    Console.readLine(
      CONSOLE_MESSAGE.ASK_WINNING_NUMBERS,
      (winningNumbersInput) => {
        const isNormal = exceptionHandler(
          validator.winningNumbers,
          winningNumbersInput
        );
        if (isNormal) return callback(winningNumbersInput);
        return inputView.readWinningNumbers(callback);
      }
    );
  },
  readBonusNumber(callback) {
    Console.readLine(CONSOLE_MESSAGE.ASK_BONUS_NUMBER, (bonusNumberInput) => {
      return callback(bonusNumberInput);
    });
  },
  readRestartCommand(callback) {
    Console.readLine(
      CONSOLE_MESSAGE.ASK_RESTART_COMMAND,
      (restartCommandInput) => {
        return callback(restartCommandInput);
      }
    );
  },
};
module.exports = inputView;
*/

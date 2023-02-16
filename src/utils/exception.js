const { errorMessage } = require('../constants/constants');
const validator = require('../domain/validation/validator');

const exception = {
  checkPurchasePrice(input) {
    if (validator.isPurchasePriceValid(input)) return;

    throw new Error(errorMessage.PURCHASE_PRICE_ERROR);
  },
  checkWinningNumbers(input) {
    if (validator.isWinningNumbersValid(input)) return;

    throw new Error(errorMessage.WINNING_NUMBERS_ERROR);
  },
  checkBonusNumber(winningNumbers, input) {
    if (validator.isBonusNumberValid(winningNumbers, input)) return;

    throw new Error(errorMessage.BONUS_NUMBER_ERROR);
  },
  checkRestartCommand(input) {
    if (validator.isRestartCommandValid(input)) return;

    throw new Error(errorMessage.RESTART_COMMAND_ERROR);
  },
};

module.exports = exception;

const { ERROR_MESSAGE } = require('../constants/constants');
const validator = require('../domain/validation/validator');

const exception = {
  handlePurchasePrice(input) {
    if (validator.isPurchasePriceValid(input)) return;

    throw new Error(ERROR_MESSAGE.PURCHASE_PRICE_ERROR);
  },
  handleWinningNumbers(input) {
    if (validator.isWinningNumbersValid(input)) return;

    throw new Error(ERROR_MESSAGE.WINNING_NUMBERS_ERROR);
  },
  handleBonusNumber(winningNumbers, input) {
    if (validator.isBonusNumberValid(winningNumbers, input)) return;

    throw new Error(ERROR_MESSAGE.BONUS_NUMBER_ERROR);
  },
  handleRestartCommand(input) {
    if (validator.isRestartCommandValid(input)) return;

    throw new Error(ERROR_MESSAGE.RESTART_COMMAND_ERROR);
  },
};

module.exports = exception;

import { errorMessage } from '../constants/constants';
import validator from '../domain/validation/validator';

const exception = {
  checkPurchasePrice(input) {
    if (validator.purchasePrice(input)) return;

    throw new Error(errorMessage.PURCHASE_PRICE_ERROR);
  },
  checkWinningNumbers(input) {
    if (validator.winningNumbers(input)) return;

    throw new Error(errorMessage.WINNING_NUMBERS_ERROR);
  },
  checkBonusNumber(winningNumbers, input) {
    if (validator.bonusNumber(winningNumbers, input)) return;

    throw new Error(errorMessage.BONUS_NUMBER_ERROR);
  },
  checkRestartCommand(input) {
    if (validator.checkRestartCommand(input)) return;

    throw new Error(errorMessage.RESTART_COMMAND_ERROR);
  },
};

export default exception;

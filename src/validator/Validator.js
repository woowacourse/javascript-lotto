import ERROR_MESSAGE from '../constant/errorMessage';

const Validator = {
  validatePurchaseAmount(purchaseAmount) {
    this.checkEmpty(purchaseAmount);
    this.checkNotNumber(purchaseAmount);
    this.purchaseAmountNotDivided(purchaseAmount);
  },

  validateWinningNumbers(winningNumbers) {},

  validateBonusNumber(bonusNumber, winningNumbers) {},

  validateRestartCommand(restartCommand) {},

  checkEmpty(input) {
    if (input.length === 0) {
      throw new Error(ERROR_MESSAGE.INPUT_IS_EMPTY);
    }
  },

  checkNotNumber(input) {
    if (!Number.isInteger(Number(input))) {
      throw new Error(ERROR_MESSAGE.INPUT_IS_NOT_NUMBER);
    }
  },

  purchaseAmountNotDivided(input) {
    if (input === 0 || input % 1000 !== 0) {
      throw new Error(ERROR_MESSAGE.PURCHASE_AMOUNT_NOT_DIVIDED);
    }
  },
};

export default Validator;

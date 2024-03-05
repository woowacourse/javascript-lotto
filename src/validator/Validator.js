import ERROR_MESSAGE from '../constant/errorMessage';
import { SETTING } from '../constant/setting';

const Validator = {
  validatePurchaseAmount(purchaseAmount) {
    this.checkEmpty(purchaseAmount);
    this.checkNotNumber(purchaseAmount);
    this.purchaseAmountNotDivided(purchaseAmount);
    this.purchaseAmountMoreThanMaximum(purchaseAmount);
  },

  validateWinningNumbers(winningNumbers) {
    this.checkEmpty(winningNumbers);
    this.checkWinningNumbersLength(winningNumbers);

    const winningNumbersList = winningNumbers.split(',').map((number) => number.trim());
    this.checkWinningNumbersDuplicated(winningNumbersList);
    winningNumbersList.forEach((winningNumber) => {
      this.validateWinningNumber(winningNumber);
    });
  },

  validateWinningNumber(winningNumber) {
    this.checkWinningNumbersNotNumber(winningNumber);
    this.checkWinningNumbersRange(winningNumber);
  },

  validateBonusNumber(bonusNumber, winningNumbers) {
    this.checkEmpty(bonusNumber);
    this.checkBonusNumberNotNumber(bonusNumber);
    this.checkBonusNumberRange(bonusNumber);
    this.checkBonusNumberDuplicated(bonusNumber, winningNumbers);
  },

  validateRestartCommand(restartCommand) {
    this.checkEmpty(restartCommand);
    this.checkRestartCommandFormat(restartCommand);
  },

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
    const purchaseAmount = parseInt(input, 10);
    if (purchaseAmount === 0 || purchaseAmount % SETTING.LOTTO_PRICE !== 0) {
      throw new Error(ERROR_MESSAGE.PURCHASE_AMOUNT_NOT_DIVIDED);
    }
  },

  purchaseAmountMoreThanMaximum(input) {
    const purchaseAmount = parseInt(input, 10);
    if (purchaseAmount > SETTING.MAX_LOTTO_PURCHASE_AMOUNT) {
      throw new Error(ERROR_MESSAGE.ABOVE_MAX_PURCHASE_AMOUNT);
    }
  },

  checkWinningNumbersLength(input) {
    const numbers = input.split(',');
    if (numbers.length !== SETTING.LOTTO_LENGTH) {
      throw new Error(ERROR_MESSAGE.LOTTO_NUMBER_LENGTH);
    }
  },

  checkWinningNumbersDuplicated(input) {
    if (new Set(input).size !== SETTING.LOTTO_LENGTH) {
      throw new Error(ERROR_MESSAGE.LOTTO_NUMBER_DUPLICATED);
    }
  },

  checkWinningNumbersNotNumber(input) {
    if (!Number.isInteger(Number(input))) {
      throw new Error(ERROR_MESSAGE.LOTTO_NUMBER_FORMAT);
    }
  },

  checkWinningNumbersRange(input) {
    if (Number(input) < SETTING.MIN_LOTTO_NUMBER || Number(input) > SETTING.MAX_LOTTO_NUMBER) {
      throw new Error(ERROR_MESSAGE.LOTTO_NUMBER_RANGE);
    }
  },

  checkBonusNumberNotNumber(input) {
    if (!Number.isInteger(Number(input))) {
      throw new Error(ERROR_MESSAGE.BONUS_NUMBER_FORMAT);
    }
  },

  checkBonusNumberRange(input) {
    if (Number(input) < SETTING.MIN_LOTTO_NUMBER || Number(input) > SETTING.MAX_LOTTO_NUMBER) {
      throw new Error(ERROR_MESSAGE.BONUS_NUMBER_RANGE);
    }
  },

  checkBonusNumberDuplicated(bonusNumber, winningNumbers) {
    if (winningNumbers.includes(parseInt(bonusNumber, 10))) {
      throw new Error(ERROR_MESSAGE.BONUS_NUMBER_DUPLICATED);
    }
  },

  checkRestartCommandFormat(input) {
    if (input.toLowerCase() !== SETTING.RESTART_COMMAND && input.toLowerCase() !== SETTING.EXIT_COMMAND) {
      throw new Error(ERROR_MESSAGE.RESTART_COMMAND_FORMAT);
    }
  },
};

export default Validator;

import ERROR_MESSAGE from '../constant/errorMessage';
import { SETTING } from '../constant/setting';

const Validator = {
  validatePurchaseAmount(purchaseAmount) {
    this.checkEmpty(purchaseAmount);
    this.checkNotNumber(purchaseAmount);
    this.purchaseAmountNotDivided(purchaseAmount);
  },

  validateWinningNumbers(winningNumbers) {
    this.checkEmpty(winningNumbers);
    this.checkWinningNumbersLength(winningNumbers);

    const winningNumberList = winningNumbers.split(',').map((number) => number.trim());
    this.checkWinningNumbersDuplicated(winningNumberList);
    winningNumberList.forEach((number) => {
      this.checkWinningNumbersNotNumber(number);
      this.checkWinningNumbersRange(number);
    });
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
    if (input === 0 || input % SETTING.LOTTO_PRICE !== 0) {
      throw new Error(ERROR_MESSAGE.PURCHASE_AMOUNT_NOT_DIVIDED);
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
    if (winningNumbers.includes(parseInt(bonusNumber))) {
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

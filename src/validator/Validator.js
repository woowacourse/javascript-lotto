import ERROR_MESSAGE from '../constant/errorMessage';
import { SETTING } from '../constant/setting';

const Validator = {
  validatePurchaseAmount(purchaseAmount) {
    this.checkEmpty(purchaseAmount);
    this.checkNotNumber(purchaseAmount);
    this.purchaseAmountNotDivided(purchaseAmount);
    this.purchaseAmountRange(purchaseAmount);
  },

  validateWinningNumbers(winningNumbers) {
    this.checkEmpty(winningNumbers);
    this.checkWinningNumbersLength(winningNumbers);

    const winningNumberList = winningNumbers
      .split(',')
      .filter((item) => item.trim() !== '')
      .map(Number);
    this.validateWinningNumberList(winningNumberList);
  },

  validateWinningNumberList(winningNumberList) {
    this.checkWinningNumbersDuplicated(winningNumberList);
    winningNumberList.forEach((number) => {
      this.checkNotNumber(number);
      this.checkLottoNumberRange(number);
    });
  },

  validateBonusNumber(bonusNumber, winningNumbers) {
    this.checkEmpty(bonusNumber);
    this.checkNotNumber(bonusNumber);
    this.checkLottoNumberRange(bonusNumber);
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
  purchaseAmountRange(input) {
    if (input > 100_000) {
      throw new Error(ERROR_MESSAGE.PURCHASE_AMOUNT_RANGE);
    }
  },

  checkWinningNumbersLength(input) {
    const numbers = input.split(',');
    if (numbers.length !== SETTING.LOTTO_LENGTH) {
      throw new Error(ERROR_MESSAGE.WINNING_LOTTO_NUMBERS_LENGTH);
    }
  },

  checkWinningNumbersDuplicated(input) {
    if (new Set(input).size !== SETTING.LOTTO_LENGTH) {
      throw new Error(ERROR_MESSAGE.WINNING_LOTTO_NUMBERS_DUPLICATED);
    }
  },

  checkLottoNumberRange(input) {
    if (Number(input) < SETTING.MIN_LOTTO_NUMBER || Number(input) > SETTING.MAX_LOTTO_NUMBER) {
      throw new Error(ERROR_MESSAGE.LOTTO_NUMBER_RANGE);
    }
  },

  checkBonusNumberDuplicated(bonusNumber, winningNumbers) {
    if (winningNumbers.includes(parseInt(bonusNumber))) {
      throw new Error(ERROR_MESSAGE.BONUS_NUMBER_DUPLICATED);
    }
  },

  checkRestartCommandFormat(input) {
    if (input !== SETTING.RESTART_COMMAND && input !== SETTING.EXIT_COMMAND) {
      throw new Error(ERROR_MESSAGE.RESTART_COMMAND_FORMAT);
    }
  },
};

export default Validator;

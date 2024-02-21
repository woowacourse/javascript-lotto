import ERROR_MESSAGE from '../constant/errorMessage';

const Validator = {
  validatePurchaseAmount(purchaseAmount) {
    this.checkEmpty(purchaseAmount);
    this.checkNotNumber(purchaseAmount);
    this.purchaseAmountNotDivided(purchaseAmount);
  },

  validateWinningNumbers(winningNumbers) {
    this.checkEmpty(winningNumbers);
    this.checkNumbersLength(winningNumbers);

    const winningNumberList = winningNumbers.split(',').map((number) => number.trim());
    this.checkNumbersDuplicated(winningNumberList);
    winningNumberList.forEach((number) => {
      this.checkLottoNotNumber(number);
      this.checkNumbersRange(number);
    });
  },

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

  checkNumbersLength(input) {
    const numbers = input.split(',');
    if (numbers.length !== 6) {
      throw new Error(ERROR_MESSAGE.LOTTO_NUMBER_LENGTH);
    }
  },

  checkNumbersDuplicated(input) {
    if (new Set(input).size !== 6) {
      throw new Error(ERROR_MESSAGE.LOTTO_NUMBER_DUPLICATED);
    }
  },

  checkLottoNotNumber(input) {
    if (!Number.isInteger(Number(input))) {
      throw new Error(ERROR_MESSAGE.LOTTO_NUMBER_FORMAT);
    }
  },

  checkNumbersRange(input) {
    if (Number(input) < 1 || Number(input) > 45) {
      throw new Error(ERROR_MESSAGE.LOTTO_NUMBER_RANGE);
    }
  },
};

export default Validator;

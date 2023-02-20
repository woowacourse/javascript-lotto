import { MESSAGE, REGEX, COMMAND, GAME_VALUE } from '../constants/index.js';

const validator = {
  validateBudget(budget) {
    this.validateDecimal(budget);
    this.validateDivisibility(budget, GAME_VALUE.LOTTO_PRICE);
  },

  validateWinningNumber(winningNumberFormat) {
    this.validateLottoForm(winningNumberFormat);
    this.validateDuplication(winningNumberFormat);
  },

  validateDecimal(number) {
    if (!REGEX.DECIMAL.test(number)) {
      throw new Error(MESSAGE.ERROR_DECIMAL);
    }
  },

  validateDivisibility(number, divisor) {
    const isDivisibility = Boolean(number % divisor) === false;

    if (!isDivisibility) {
      throw new Error(`[ERROR] 구입 금액은 ${divisor}원 단위여야 합니다`);
    }
  },

  validateLottoForm(winningLotto) {
    if (!REGEX.WINNING_LOTTO_FORMAT.test(winningLotto)) {
      throw new Error(MESSAGE.ERROR_INVALID_LOTTO_FORMAT);
    }
  },

  validateDuplication(winningLotto) {
    const numbers = winningLotto.split(',');
    const hasDuplication = numbers.length !== new Set(numbers).size;

    if (hasDuplication) {
      throw new Error(MESSAGE.ERROR_LOTTO_DUPLICATES);
    }
  },

  validateBonusNumber(bonusNumber) {
    if (!REGEX.BONUS_NUMBER.test(bonusNumber)) {
      throw new Error(MESSAGE.ERROR_INVALID_BONUS_NUMBER);
    }
  },

  validateRetryCommand(retryCommand) {
    const isValidUserCommand = COMMAND.RETRY === retryCommand || COMMAND.EXIT === retryCommand;

    if (!isValidUserCommand) {
      throw new Error(MESSAGE.ERROR_INVALID_RETRY_COMMAND);
    }
  },
};

export default validator;

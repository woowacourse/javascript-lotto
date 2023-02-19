import { MESSAGE, REGEX, COMMAND, GAME_VALUE } from '../constants/index.js';

const validator = {
  throwErrorIfInvalidBudget(budget) {
    this.throwErrorIfNotDecimal(budget);
    this.throwErrorIfNotDivisiable(budget, GAME_VALUE.LOTTO_PRICE);
  },

  throwErrorIfInvalidWinningNumbers(winningNumberFormat) {
    this.throwErrorIfInvalidWinningLotto(winningNumberFormat);
    this.throwErrorIfIncludesDuplicate(winningNumberFormat);
  },

  throwErrorIfNotDecimal(number) {
    if (!REGEX.DECIMAL.test(number)) {
      throw new Error(MESSAGE.ERROR_DECIMAL);
    }
  },

  throwErrorIfNotDivisiable(number, divisor) {
    const isDivisiableByDivisor = Boolean(number % divisor) === false;

    if (!isDivisiableByDivisor) {
      throw new Error(MESSAGE.ERROR_BUDGET_NOT_DIVISIBLE(divisor));
    }
  },

  throwErrorIfInvalidWinningLotto(winningLotto) {
    if (!REGEX.WINNING_LOTTO_FORMAT.test(winningLotto)) {
      throw new Error(MESSAGE.ERROR_INVALID_LOTTO_FORMAT);
    }
  },

  throwErrorIfIncludesDuplicate(winningLotto) {
    const numbers = winningLotto.split(',');
    const haveDuplicates = numbers.length !== new Set(numbers).size;

    if (haveDuplicates) {
      throw new Error(MESSAGE.ERROR_LOTTO_DUPLICATES);
    }
  },

  throwErrorIfInvalidBonusNumber(bonusNumber) {
    if (!REGEX.BONUS_NUMBER.test(bonusNumber)) {
      throw new Error(MESSAGE.ERROR_INVALID_BONUS_NUMBER);
    }
  },

  throwErrorIfInvalidUserCommand(userCommand) {
    const isValidUserCommand = COMMAND.RESTART === userCommand || COMMAND.EXIT === userCommand;

    if (!isValidUserCommand) {
      throw new Error(MESSAGE.ERROR_INVALID_RETRY_COMMAND);
    }
  },
};

export default validator;

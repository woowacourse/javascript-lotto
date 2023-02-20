const { ERROR_MESSAGE } = require('../constant/message');
const { COMMAND, LOTTO } = require('../constant/setting');

const Validator = {
  purchaseAmount(money) {
    this.number(money);

    if (this.isLessThanMinimum(+money)) {
      throw new Error(ERROR_MESSAGE.LESS_THAN_MINIMUM);
    }
    if (this.hasChange(+money)) {
      throw new Error(ERROR_MESSAGE.HAS_CHANGE);
    }
  },

  isLessThanMinimum(money) {
    return money < LOTTO.UNIT;
  },

  hasChange(money) {
    return money % LOTTO.UNIT !== 0;
  },

  winningNumber(numbers) {
    const winningNumbers = numbers.split(',');
    winningNumbers.forEach((number) => this.winningNumberElement(number));

    if (!this.isValidLength(winningNumbers)) {
      throw new Error(ERROR_MESSAGE.INVALID_WINNING_NUMBER_LENGTH);
    }
    if (this.hasDuplicatedNumber(winningNumbers)) {
      throw new Error(ERROR_MESSAGE.DUPLICATED_NUMBER);
    }
  },

  winningNumberElement(number) {
    this.number(number);

    if (this.isOutOfRange(number)) {
      throw new Error(ERROR_MESSAGE.OUT_OF_RANGE);
    }
  },

  bonusNumber(bonusNumber, winningNumber) {
    this.number(bonusNumber);

    if (this.isOutOfRange(+bonusNumber)) {
      throw new Error(ERROR_MESSAGE.OUT_OF_RANGE);
    }
    if (this.isDuplicatedNumber(+bonusNumber, winningNumber)) {
      throw new Error(ERROR_MESSAGE.DUPLICATED_NUMBER);
    }
  },

  isDuplicatedNumber(bonusNumber, winningNumber) {
    return winningNumber.includes(bonusNumber);
  },

  restartCommand(command) {
    if (!this.isValidRestartCommand(command)) {
      throw new Error(ERROR_MESSAGE.INVALID_RESTART_COMMAND);
    }
  },

  isValidRestartCommand(command) {
    return command === COMMAND.YES || command === COMMAND.NO;
  },

  isOutOfRange(number) {
    return number < LOTTO.MIN_NUMBER_RANGE || number > LOTTO.MAX_NUMBER_RANGE;
  },

  hasDuplicatedNumber(numbers) {
    return numbers.length !== new Set(numbers).size;
  },

  isValidLength(numbers) {
    return numbers.length === LOTTO.LENGTH;
  },

  number(number) {
    if (this.isNull(number)) {
      throw new Error(ERROR_MESSAGE.NULL);
    }
    if (this.hasBlank(number)) {
      throw new Error(ERROR_MESSAGE.HAS_BLANK);
    }
    if (isNaN(number)) {
      throw new Error(ERROR_MESSAGE.NOT_A_NUMBER);
    }
  },

  isNull(input) {
    return input === '';
  },

  hasBlank(input) {
    return input.includes(' ');
  },
};

module.exports = Validator;

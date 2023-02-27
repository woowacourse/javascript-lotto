import { ERROR_MESSAGE } from '../constant/message';
import { COMMAND, LOTTO } from '../constant/setting';

const Validate = {
  purchaseAmount(money) {
    Validate.number(money);

    if (Validate.isLessThanMinimum(+money)) {
      throw new Error(ERROR_MESSAGE.LESS_THAN_MINIMUM);
    }
    if (Validate.hasChange(+money)) {
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
    winningNumbers.forEach((number) => Validate.winningNumberElement(number));

    if (!Validate.isValidLength(winningNumbers)) {
      throw new Error(ERROR_MESSAGE.INVALID_WINNING_NUMBER_LENGTH);
    }
    if (Validate.hasDuplicatedNumber(winningNumbers)) {
      throw new Error(ERROR_MESSAGE.DUPLICATED_NUMBER);
    }
  },

  winningNumberElement(number) {
    Validate.number(number);

    if (Validate.isOutOfRange(number)) {
      throw new Error(ERROR_MESSAGE.OUT_OF_RANGE);
    }
  },

  bonusNumber(bonusNumber, winningNumber) {
    Validate.number(bonusNumber);

    if (Validate.isOutOfRange(+bonusNumber)) {
      throw new Error(ERROR_MESSAGE.OUT_OF_RANGE);
    }
    if (Validate.isDuplicatedNumber(+bonusNumber, winningNumber)) {
      throw new Error(ERROR_MESSAGE.DUPLICATED_NUMBER);
    }
  },

  isDuplicatedNumber(bonusNumber, winningNumber) {
    return winningNumber.includes(bonusNumber);
  },

  restartCommand(command) {
    if (!Validate.isValidRestartCommand(command)) {
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
    if (Validate.isNull(number)) {
      throw new Error(ERROR_MESSAGE.NULL);
    }
    if (Validate.hasBlank(number)) {
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

export default Validate;

import { ERROR_MESSAGE, CONDITIONS } from './constants/constants';

export const validator = {
  isMoneyInputValid(input) {
    if (this.isMoneyNull(input)) {
      throw new Error(ERROR_MESSAGE.NULL_INPUT_ERROR);
    }
    if (!this.isMoneyInteger(input)) {
      throw new Error(ERROR_MESSAGE.NOT_INTEGER_INPUT_ERROR);
    }
    if (!this.isMoneyPositive(input)) {
      throw new Error(ERROR_MESSAGE.NEGATIVE_INPUT_ERROR);
    }
    if (!this.isMoneyMultiplesOfThousand(input)) {
      throw new Error(ERROR_MESSAGE.NOT_MUTIPLE_THOUSAND);
    }
    return true;
  },

  isMoneyPositive(input) {
    return input > 0;
  },

  isMoneyInteger(input) {
    return Number.isInteger(input);
  },

  isMoneyMultiplesOfThousand(input) {
    return input % 1000 === 0;
  },

  isMoneyNull(input) {
    return input === 0;
  },

  isWinningNumbersInputValid(winningNumbers, bonusNumber) {
    if (!this.isWinningNumberNotDuplicated(winningNumbers)) {
      throw new Error(ERROR_MESSAGE.HAS_DUPLICATED_WINNING_NUMBER);
    }
    if (this.isBonusNumberDuplicated(winningNumbers, bonusNumber)) {
      throw new Error(ERROR_MESSAGE.HAS_DUPLICATED_BONUS_NUMBER);
    }
    if (!this.isWinningNumbersInRange(winningNumbers)) {
      throw new Error(ERROR_MESSAGE.HAS_OUT_OF_RANGE_WINNING_NUMBER);
    }

    if (!this.isBonusNumbersInRange(bonusNumber)) {
      throw new Error(ERROR_MESSAGE.HAS_OUT_OF_RANGE_BONUS_NUMBER);
    }

    return true;
  },

  isWinningNumberNotDuplicated(input) {
    return new Set(input).size === CONDITIONS.LOTTO_SIZE;
  },

  isBonusNumberDuplicated(winningNumbers, bonusNumber) {
    return winningNumbers.includes(bonusNumber);
  },

  isWinningNumbersInRange(winningNumbers) {
    return winningNumbers.every((e) => CONDITIONS.LOTTO_NUM_MIN <= e && e <= CONDITIONS.LOTTO_NUM_MAX);
  },

  isBonusNumbersInRange(bonusNumber) {
    return CONDITIONS.LOTTO_NUM_MIN <= bonusNumber && bonusNumber <= CONDITIONS.LOTTO_NUM_MAX;
  },
};

export const getValues = {
  randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  },
};

import { CONDITIONS, ERROR_MESSAGE } from './constants/constants';

export const validator = {
  isInputValid(input) {
    if (!this.isMoneyPositive(input)) {
      throw new Error(ERROR_MESSAGE.NEGATIVE_INPUT);
    }
    if (!this.isMoneyInteger(input)) {
      throw new Error(ERROR_MESSAGE.NOT_INTEGER_INPUT);
    }
    if (this.isMoneyTooBig(input)) {
      throw new Error(ERROR_MESSAGE.TOO_BIG_INPUT);
    }
    if (this.isMoneyTooSmall(input)) {
      throw new Error(ERROR_MESSAGE.TOO_SMALL_INPUT);
    }
  },

  isMoneyPositive(input) {
    return input > 0;
  },

  isMoneyInteger(input) {
    return Number.isInteger(input);
  },

  isMoneyTooBig(input) {
    return input >= CONDITIONS.LOTTO_PRICE * 100;
  },

  isMoneyTooSmall(input) {
    return input < CONDITIONS.LOTTO_PRICE;
  },

  isWinningInputValid(winningNumbers, bonusNumber) {
    if (this.isWinningsEmpty(winningNumbers, bonusNumber)) {
      throw new Error(ERROR_MESSAGE.WINNINGS_NO_EMPTY);
    }
    if (this.isWinningsOverlapped(winningNumbers, bonusNumber)) {
      throw new Error(ERROR_MESSAGE.WINNGINGS_NO_OVERLAPPED);
    }
    if (this.isWinningOUtCoverage(winningNumbers, bonusNumber)) {
      throw new Error(ERROR_MESSAGE.WINNINGS_COVERAGE);
    }
  },

  isWinningsEmpty(winningNumbers, bonusNumber) {
    const checkLotto = new Set(Object.values(winningNumbers));
    return [...checkLotto].some((number) => number === '') || bonusNumber === '';
  },

  isWinningsOverlapped(winningNumbers, bonusNumber) {
    const checkLotto = new Set(Object.values(winningNumbers));
    return checkLotto.size !== CONDITIONS.LOTTO_SIZE || checkLotto.has(bonusNumber);
  },

  isWinningOUtCoverage(winningNumbers, bonusNumber) {
    const checkLotto = new Set(Object.values(winningNumbers));
    return (
      [...checkLotto].some(
        (number) =>
          Number(number) > CONDITIONS.LOTTO_NUM_MAX || Number(number) < CONDITIONS.LOTTO_NUM_MIN
      ) ||
      Number(bonusNumber) > CONDITIONS.LOTTO_NUM_MAX ||
      Number(bonusNumber) < CONDITIONS.LOTTO_NUM_MIN
    );
  },
};

export const getValues = {
  randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  },
};

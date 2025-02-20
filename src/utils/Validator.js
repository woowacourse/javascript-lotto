import {
  LOTTO_NUMBER_END,
  LOTTO_NUMBER_MAX_LENGTH,
  LOTTO_NUMBER_START,
  LOTTO_PURCHASE_UNIT,
  NO,
  YES,
} from "../constants/constant.js";

const Validator = {
  isEmpty(input) {
    return !input;
  },

  isNotDivisible(purchaseAmount) {
    return purchaseAmount % LOTTO_PURCHASE_UNIT !== 0;
  },

  isFormat(winningNumbers) {
    return winningNumbers.length === 1;
  },

  isNotNumber(winningNumbers) {
    return winningNumbers.some((number) => isNaN(number));
  },

  isMaxLength(winningNumbers) {
    return winningNumbers.length !== LOTTO_NUMBER_MAX_LENGTH;
  },

  isWinningNumbersRange(winningNumbers) {
    return !winningNumbers.every((num) => num >= LOTTO_NUMBER_START && num <= LOTTO_NUMBER_END);
  },

  isDuplicate(winningNumbers) {
    return new Set(winningNumbers).size !== winningNumbers.length;
  },

  isBonusNumberRange(bonusNumber) {
    return bonusNumber < LOTTO_NUMBER_START || bonusNumber > LOTTO_NUMBER_END;
  },
  isIncludeNumber(winningNumbers, bonusNumber) {
    return winningNumbers.includes(bonusNumber);
  },
  isYesOrNo(input) {
    return input !== YES && input !== NO;
  },
  isYes(input) {
    return input === YES;
  },
  isNo(input) {
    return input === NO;
  },
};

export default Validator;

import {
  isDivisible,
  isPositiveInteger,
  hasEmptyString,
  hasOutRangeNumber,
  isDiffArrayLength,
  hasDuplicateItem,
  getDuplicateIndex,
} from '../validator';
import { LOTTO_SETTING } from '../../constants/setting';
import { ERROR_MESSAGE } from '../../constants/string';

export const checkValidMoneyInput = (money) => {
  if (!isPositiveInteger(money)) {
    throw new Error(ERROR_MESSAGE.NOT_POSITIVE_NUMBER_INPUT);
  }

  if (!isDivisible(money, LOTTO_SETTING.PRICE)) {
    throw new Error(ERROR_MESSAGE.WRONG_LOTTO_PRICE_UNIT_INPUT);
  }
};

export const checkValidWinningNumberList = (winningNumberList) => {
  if (hasEmptyString(winningNumberList)) {
    throw new Error(ERROR_MESSAGE.WINNING_NUMBER_EMPTY_INPUT);
  }

  const { MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER, WINNING_NUMBER_LENGTH } = LOTTO_SETTING;
  if (hasOutRangeNumber(winningNumberList, MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER)) {
    throw new Error(ERROR_MESSAGE.WINNING_NUMBER_NUMBER_RANGE);
  }

  if (isDiffArrayLength(winningNumberList, WINNING_NUMBER_LENGTH)) {
    throw new Error(ERROR_MESSAGE.WINNING_NUMBER_DIFF_LENGTH);
  }

  if (hasDuplicateItem(winningNumberList)) {
    throw new Error(ERROR_MESSAGE.WINNING_NUMBER_DUPLICATE_NUMBER);
  }
};

export const getWinningNumberErrorIndexList = (winningNumberList) => {
  const { MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER } = LOTTO_SETTING;

  const output = [];
  winningNumberList.forEach((winningNumber, index) => {
    if (
      hasEmptyString([winningNumber]) ||
      hasOutRangeNumber([winningNumber], MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER)
    ) {
      output.push(index);
    }
  });

  if (output.length === 0 && hasDuplicateItem(winningNumberList)) {
    return getDuplicateIndex(winningNumberList);
  }

  return output;
};

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
    throw new Error('당첨 번호에 빈 칸이 있습니다.');
  }

  const { MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER } = LOTTO_SETTING;
  if (hasOutRangeNumber(winningNumberList, MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER)) {
    throw new Error('당첨 번호는 1에서 45까지의 숫자만 입력할 수 있습니다.');
  }

  if (isDiffArrayLength(winningNumberList, 7)) {
    throw new Error(
      '당첨 번호는 당첨 번호 6자리와 보너스 번호 1자리로 총 7자리를 입력해주셔야 합니다.'
    );
  }

  if (hasDuplicateItem(winningNumberList)) {
    throw new Error('당첨 번호는 중복된 숫자를 입력할 수 없습니다.');
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

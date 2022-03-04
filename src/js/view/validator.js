import { ERROR_MESSAGE, RULES } from '../constants/index.js';
import {
  isDuplicated,
  isEmpty,
  isNegativeNumber,
  isNotNumber,
  isNotThousandUnit,
  isZero,
} from '../utils/common.js';

export const validatePurchaseMoney = value => {
  if (isZero(value)) {
    throw new Error(ERROR_MESSAGE.ZERO_PURCHASE_MONEY);
  }

  if (isNotNumber(value)) {
    throw new Error(ERROR_MESSAGE.INVALID_PURCHASE_MONEY_TYPE);
  }

  if (isNegativeNumber(value)) {
    throw new Error(ERROR_MESSAGE.NEGATIVE_PURCHASE_MONEY);
  }

  if (isNotThousandUnit(value)) {
    throw new Error(ERROR_MESSAGE.NOT_PURCHASE_MONEY_UNIT_OF_THOUSAND);
  }
};

export const validateWinningNumberList = list => {
  if (list.some(value => isEmpty(value))) {
    throw new Error(ERROR_MESSAGE.EMPTY_WINNING_NUMBER);
  }

  if (list.some(value => isNotNumber(value))) {
    throw new Error(ERROR_MESSAGE.INVALID_WINNING_NUMBER_TYPE);
  }

  if (list.some(value => isOutLottoNumberRange(value))) {
    throw new Error(ERROR_MESSAGE.OUT_WINNING_NUMBER_RANGE);
  }

  if (isDuplicated(list)) {
    throw new Error(ERROR_MESSAGE.DUPLICATE_WINNING_NUMBER);
  }
};

export const isOutLottoNumberRange = value => {
  return value < RULES.MIN_LOTTO_NUMBER || value > RULES.MAX_LOTTO_NUMBER;
};

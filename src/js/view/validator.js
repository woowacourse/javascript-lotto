import { ERROR_MESSAGE, RULES } from '../constants/index.js';
import {
  isDuplicated,
  isIncludeEmpty,
  isIncludeNotNumber,
  isNegativeNumber,
  isNotDividedIntoUnit,
  isNotNumber,
  isZero,
} from '../utils/common.js';

const purchaseMoneyValidator = [
  { func: isZero, errorMessage: ERROR_MESSAGE.ZERO_PURCHASE_MONEY },
  {
    func: isNotNumber,
    errorMessage: ERROR_MESSAGE.INVALID_PURCHASE_MONEY_TYPE,
  },
  {
    func: isNegativeNumber,
    errorMessage: ERROR_MESSAGE.NEGATIVE_PURCHASE_MONEY,
  },
  {
    func: isNotDividedIntoUnit,
    errorMessage: ERROR_MESSAGE.NOT_PURCHASE_MONEY_UNIT_OF_THOUSAND,
  },
];

const isOutLottoNumberRange = value => {
  return value < RULES.MIN_LOTTO_NUMBER || value > RULES.MAX_LOTTO_NUMBER;
};

const isIncludeOutLottoNumberRange = list => {
  return list.some(value => isOutLottoNumberRange(value));
};

const winningNumberListValidator = [
  { func: isIncludeEmpty, errorMessage: ERROR_MESSAGE.EMPTY_WINNING_NUMBER },
  {
    func: isIncludeNotNumber,
    errorMessage: ERROR_MESSAGE.INVALID_WINNING_NUMBER_TYPE,
  },
  {
    func: isIncludeOutLottoNumberRange,
    errorMessage: ERROR_MESSAGE.OUT_WINNING_NUMBER_RANGE,
  },
  {
    func: isDuplicated,
    errorMessage: ERROR_MESSAGE.DUPLICATE_WINNING_NUMBER,
  },
];

export const validatePurchaseMoney = value => {
  purchaseMoneyValidator.every(({ func, errorMessage }) => {
    if (func(value)) {
      throw new Error(errorMessage);
    }
    return true;
  });
};

export const validateWinningNumberList = list => {
  winningNumberListValidator.every(({ func, errorMessage }) => {
    if (func(list)) {
      throw new Error(errorMessage);
    }
    return true;
  });
};

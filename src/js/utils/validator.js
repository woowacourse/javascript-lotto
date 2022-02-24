import { ERROR_MESSAGE } from '../constants/index.js';
import {
  isZero,
  isNotNumber,
  isNegativeNumber,
  isNotUnitOfThousand,
} from './common.js';

export const validatePurchaseMoney = value => {
  if (isZero(value)) {
    throw new Error(ERROR_MESSAGE.ZERO_MONEY);
  }

  if (isNotNumber(value)) {
    throw new Error(ERROR_MESSAGE.NOT_NUMBER_TYPE);
  }

  if (isNegativeNumber(value)) {
    throw new Error(ERROR_MESSAGE.NEGATIVE_NUMBER);
  }

  if (isNotUnitOfThousand(value)) {
    throw new Error(ERROR_MESSAGE.NOT_UNIT_OF_THOUSAND);
  }
};

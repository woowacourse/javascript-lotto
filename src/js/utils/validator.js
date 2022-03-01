import { ERROR_MESSAGE, RULES } from '../constants/index.js';
import {
  isZero,
  isNotNumber,
  isNegativeNumber,
  isNotUnitOfThousand,
  isEmpty,
  isDuplicated,
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

export const validateWinningNumberList = list => {
  if (list.some(value => isEmpty(value))) {
    throw new Error('모든 값을 입력해주세요');
  }

  if (list.some(value => isNotNumber(value))) {
    throw new Error('모든 값은 숫자 타입으로 입력해주세요.');
  }

  if (list.some(value => isOutOfLottoNumberRange(value))) {
    throw new Error(
      '모든 값은 로또번호 범위이내로 입력해주세요.(로또번호 : 1 ~ 45)',
    );
  }

  if (isDuplicated(list)) {
    throw new Error('모든 값은 중복된 숫자없이 입력해주세요.');
  }
};

export const isOutOfLottoNumberRange = value => {
  return value < RULES.MIN_LOTTO_NUMBER || value > RULES.MAX_LOTTO_NUMBER;
};

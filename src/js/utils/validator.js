import { LOTTO_NUMBERS, ALERT_MESSAGE } from '../constants/index';

const validator = Object.freeze({
  isDividedThousand: (value) => value % LOTTO_NUMBERS.THOUSAND === 0,

  isOverThousand: (value) => value >= LOTTO_NUMBERS.THOUSAND,

  isNumber: (value) => value.match(/[0-9]/),

  isDuplicateWinningNumbers: (value) => [...new Set(value)].length !== value.length,

  isOverRangeNumbers: (value) =>
    value.some(
      (elem) => elem > LOTTO_NUMBERS.MAX_LOTTO_NUMBER || elem < LOTTO_NUMBERS.MIN_LOTTO_NUMBER,
    ),

  isAllNumber: (value) => value.every((elem) => typeof elem === 'number'),
});

export const checkValidLottoCount = (value) => {
  if (!validator.isNumber(value)) {
    throw Error(ALERT_MESSAGE.MUST_NUMBER);
  }
  if (!validator.isOverThousand(value)) {
    throw Error(ALERT_MESSAGE.OVER_THOUSAND_INPUT);
  }
  if (!validator.isDividedThousand(value)) {
    throw Error(ALERT_MESSAGE.DIVIDED_BY_THOUSAND);
  }
};

export const checkValidWinningNumbers = (value) => {
  if (validator.isOverRangeNumbers(value)) {
    throw Error(ALERT_MESSAGE.OUT_OF_BOUNDS);
  }
  if (validator.isDuplicateWinningNumbers(value)) {
    throw Error(ALERT_MESSAGE.DUPLICATED_NUMBERS);
  }
};

import { LOTTO_NUMBERS, ALERT_MESSAGE } from '../constants/index';

export const validator = Object.freeze({
  isDividedLottoPrice: (value) => value % LOTTO_NUMBERS.LOTTO_PRICE === 0,

  isOverLottoPrice: (value) => value >= LOTTO_NUMBERS.LOTTO_PRICE,

  isNumber: (value) => Number.isInteger(value),

  hasEmptyInput: (value) => value.some((e) => Number.isNaN(e)),

  isDuplicateWinningNumbers: (value) => {
    const filteredValue = value.filter((e) => !Number.isNaN(e));

    return [...new Set(filteredValue)].length !== filteredValue.length;
  },

  isOverRangeNumbers: (value) =>
    value.some(
      (elem) => elem > LOTTO_NUMBERS.MAX_LOTTO_NUMBER || elem < LOTTO_NUMBERS.MIN_LOTTO_NUMBER,
    ),

  isAllNumber: (value) => value.every((elem) => Number.isInteger(elem)),

  isOverMaxLottoCount: (value) => value / LOTTO_NUMBERS.LOTTO_PRICE > LOTTO_NUMBERS.MAX_LOTTO_COUNT,
});

export const checkValidLottoCount = (value) => {
  if (!validator.isNumber(value)) {
    throw Error(ALERT_MESSAGE.MUST_NUMBER);
  }
  if (!validator.isOverLottoPrice(value)) {
    throw Error(ALERT_MESSAGE.OVER_THOUSAND_LOTTO_PRICE);
  }
  if (!validator.isDividedLottoPrice(value)) {
    throw Error(ALERT_MESSAGE.DIVIDED_BY_LOTTO_PRICE);
  }
  if (validator.isOverMaxLottoCount(value)) {
    throw Error(ALERT_MESSAGE.OVER_MAX_LOTTO_COUNT);
  }
};

export const checkValidWinningNumbers = (value) => {
  if (validator.isDuplicateWinningNumbers(value)) {
    throw Error(ALERT_MESSAGE.DUPLICATED_NUMBERS);
  }
  if (validator.isOverRangeNumbers(value)) {
    throw Error(ALERT_MESSAGE.OUT_OF_BOUNDS);
  }
  if (validator.hasEmptyInput(value)) {
    throw Error(ALERT_MESSAGE.EMPTY_INPUT);
  }
};

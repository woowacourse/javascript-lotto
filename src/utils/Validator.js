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

  isZero(input) {
    return input === 0;
  },

  isNotDivisible(purchaseAmount) {
    return purchaseAmount % LOTTO_PURCHASE_UNIT !== 0;
  },

  isFormat(numbers) {
    return numbers.length === 1;
  },

  isNotNumber(numbers) {
    return numbers.some((number) => isNaN(number));
  },

  isMaxLength(numbers) {
    return numbers.length !== LOTTO_NUMBER_MAX_LENGTH;
  },

  isWinningNumbersRange(numbers) {
    return !numbers.every((num) => num >= LOTTO_NUMBER_START && num <= LOTTO_NUMBER_END);
  },

  isDuplicate(numbers) {
    return new Set(numbers).size !== numbers.length;
  },

  isBonusNumberRange(number) {
    return number < LOTTO_NUMBER_START || number > LOTTO_NUMBER_END;
  },

  isIncludeNumber(Numbers, number) {
    return Numbers.includes(number);
  },

  isYesOrNo(input) {
    return input !== YES && input !== NO;
  },
};

export default Validator;

import { LOTTO_CONDITION } from '../../constants/constants.js';

export const LottoNumberValidator = {
  isValidCount(numbers) {
    return numbers.length !== LOTTO_CONDITION.COUNT;
  },

  isInteger(numbers) {
    return !Number.isInteger(numbers);
  },

  isValidRange(number) {
    return number < LOTTO_CONDITION.MIN_NUMBER || number > LOTTO_CONDITION.MAX_NUMBER;
  },

  isDuplicated(numbers) {
    const lottoSet = new Set(numbers);

    return numbers.length !== lottoSet.size;
  },
};

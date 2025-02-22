import { LOTTO_CONDITION } from '../../constants/constants.js';

export const lottoNumberValidator = {
  isValidCount(numbers) {
    return numbers.length !== LOTTO_CONDITION.COUNT;
  },

  isDuplicated(numbers) {
    const lottoSet = new Set(numbers);

    return numbers.length !== lottoSet.size;
  },
};

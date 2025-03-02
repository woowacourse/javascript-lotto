import { makeNotDuplicatedRandomNumbers } from './math.js';
import { LOTTO_DEFINITION } from '../Domain/Constant/definition.js';

export const generateRandomLottoNumbers = () => {
  return makeNotDuplicatedRandomNumbers(LOTTO_DEFINITION.NUMBER_COUNTS, {
    min: LOTTO_DEFINITION.MIN_NUMBER,
    max: LOTTO_DEFINITION.MAX_NUMBER,
  }).sort((a, b) => a - b);
};

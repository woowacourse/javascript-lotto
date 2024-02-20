import { RANDOM_NUMBER_RULE, LOTTO_RULE } from '../constants';

const LottoValidator = {
  private_isInteger(numbers) {
    return numbers.every((number) => Number.isInteger(number));
  },

  private_isNumberRange(numbers) {
    const { start, end } = RANDOM_NUMBER_RULE.range;

    return numbers.every((number) => start <= number && number <= end);
  },

  private_isValidNumberCount(numbers) {
    const { count } = LOTTO_RULE;

    return numbers.length === count;
  },

  private_isDuplicate(numbers) {
    return numbers.length === new Set(numbers).size;
  },

  validate(numbers) {
    const isValid =
      this.private_isInteger(numbers) &&
      this.private_isNumberRange(numbers) &&
      this.private_isValidNumberCount(numbers) &&
      this.private_isDuplicate(numbers);

    if (!isValid) {
      throw new Error('error');
    }
  },
};

export default LottoValidator;

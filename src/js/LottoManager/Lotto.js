import { createRandomNumbers } from '../utils/index.js';
import { LOTTO_RULES } from '../constant/index.js';

export default class Lotto {
  constructor() {
    this.numbers = createRandomNumbers(
      LOTTO_RULES.MIN_RANGE,
      LOTTO_RULES.MAX_RANGE,
      LOTTO_RULES.BALL_COUNT,
    );
  }
}

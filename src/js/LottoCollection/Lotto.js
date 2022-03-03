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

  match(winningNumber, bonusNumber) {
    const isMatchedBonus = this.numbers.includes(bonusNumber);
    const matchCount = this.numbers.reduce(
      (acc, number) => acc + (winningNumber.has(number) ? 1 : 0),
      0,
    );

    if (isMatchedBonus && matchCount === 5) return 7;
    return matchCount;
  }
}

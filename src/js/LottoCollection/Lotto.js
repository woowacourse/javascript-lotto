import { createRandomNumbers } from '../utils/index.js';
import { LOTTO_RULES, MATCH_COUNT_OF_LOTTO_RANKING } from '../constant/index.js';

export default class Lotto {
  constructor() {
    this.numbers = createRandomNumbers(
      LOTTO_RULES.MIN_RANGE,
      LOTTO_RULES.MAX_RANGE,
      LOTTO_RULES.BALL_COUNT,
    );
  }

  match(winningNumbers, bonusNumber) {
    const isMatchedBonus = this.numbers.includes(bonusNumber);
    const matchCount = this.numbers.filter((number) => winningNumbers.has(number)).length;

    if (isMatchedBonus && matchCount === MATCH_COUNT_OF_LOTTO_RANKING.THIRD)
      return MATCH_COUNT_OF_LOTTO_RANKING.SECOND;
    return matchCount;
  }
}

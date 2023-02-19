import ArrayHandler from '../util/ArrayHandler.js';
import { RANK, RANKING_TABLE } from '../constant/rank.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
  }

  getRank({ luckyNumbers, bonusNumber }) {
    const matchCount = ArrayHandler.getMatchCount(this.#numbers, luckyNumbers);
    const isSecondRank = matchCount === 5 && this.hasBonusNumber(bonusNumber);

    return isSecondRank ? RANK.SECOND : RANKING_TABLE[matchCount];
  }

  hasBonusNumber(bonusNumber) {
    return this.#numbers.includes(bonusNumber);
  }

  getNumbers() {
    return this.#numbers;
  }
}

export default Lotto;

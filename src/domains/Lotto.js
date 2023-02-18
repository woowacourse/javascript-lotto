import ArrayHandler from '../utils/ArrayHandler.js';
import RANKING_TABLE from '../constants/rankingTable.js';
import RANK from '../constants/rank.js';

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

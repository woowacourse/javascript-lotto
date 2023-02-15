import ArrayHandler from '../util/ArrayHandler.js';
import RANKING_TABLE from '../constant/rankingTable.js';

class Lotto {
  #numbers;
  #luckyNumbers;
  #bonusNumber;

  constructor(numbers) {
    this.#numbers = numbers;
  }

  getRank(luckyNumbers, bonusNumber) {
    const matchCount = ArrayHandler.getMatchCount(this.#numbers, luckyNumbers);

    if (matchCount === 5 && this.hasBonusNumber(bonusNumber)) return 2;

    return RANKING_TABLE[matchCount];
  }

  hasBonusNumber(bonusNumber) {
    return this.#numbers.includes(bonusNumber);
  }
}

export default Lotto;

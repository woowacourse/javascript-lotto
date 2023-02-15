import NumberHandler from "../util/NumberHandler.js";
import RANKING_TABLE from "../constant/rankingTable.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
  }

  getRank(luckyNumbers, bonusNumber) {
    const matchCount = NumberHandler.getMatchCount(this.#numbers, luckyNumbers);

    if (matchCount === 5 && this.hasBonusNumber(bonusNumber)) return 2;

    return RANKING_TABLE[matchCount];
  }

  hasBonusNumber(bonusNumber) {
    return this.#numbers.includes(bonusNumber);
  }
}

export default Lotto;

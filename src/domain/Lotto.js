import NumberHandler from "../util/NumberHandler.js";
import RANKING_TABLE from "../constant/rankingTable.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
  }

  getRank(luckyNumbers, bonusNumber) {}

  hasBonusNumber(bonusNumber) {
    return this.#numbers.includes(bonusNumber);
  }
}

export default Lotto;

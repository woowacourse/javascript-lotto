import { matchWinningCount, matchBonus } from "../domain/MatchLottos.js";
import { calPrize } from "../domain/WinningRate.js";

class Lotto {
  #numbers;

  constructor(number) {
    //검증
    this.#numbers = number;
  }

  getRank(winningLotto, bonusNum) {
    const matchCount = matchWinningCount([...this.#numbers], winningLotto);
    const hasBonus = matchBonus([...this.#numbers], bonusNum);
    const rank = calPrize(matchCount, hasBonus);

    return rank;
  }

  toString() {
    return `[${this.#numbers.join(", ")}]`;
  }
}

export default Lotto;

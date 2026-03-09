import { matchWinningCount, matchBonus } from "../domain/MatchLottos.js";
import { calPrize } from "../domain/WinningRate.js";
import Validator from "../utils/Validator.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    Validator.validateLottoCount(numbers);
    numbers.forEach((number) => Validator.validateLottoNumRange(number));
    Validator.validateDuplicateLottoNums(numbers);
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

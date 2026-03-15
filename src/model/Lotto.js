import { ERROR_MESSAGE } from "../constants/message.js";
import { matchWinningCount, matchBonus } from "../domain/MatchLottos.js";
import { calRank } from "../domain/WinningRate.js";
import Validator from "../utils/WebValidator.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }
  #validate(numbers) {
    if (numbers.some(num => !Number.isInteger(Number(num)))) {
      throw new Error(ERROR_MESSAGE.INVALID_POSITIVE_INTEGER);
    }
    Validator.validateLottoCount(numbers);
    Validator.validateDuplicateLottoNums(numbers);
    numbers.forEach((number) => Validator.validateLottoNumRange(number));
  }

  getRank(winningLotto, bonusNum) {
    const winningNums = winningLotto.getNumbers(winningLotto);
    const matchCount = matchWinningCount([...this.#numbers], winningNums);
    const hasBonus = matchBonus([...this.#numbers], bonusNum);
    const rank = calRank(matchCount, hasBonus);

    return rank;
  }

  toString() {
    return `${this.#numbers.join(", ")}`;
  }

  getNumbers(){
    return [...this.#numbers];
  }
}

export default Lotto;

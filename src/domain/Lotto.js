import { WINNING_RANK } from "../constants/lotto-constants.js";
import lottoNumberValidator from "../validator/LottoNumberValidator.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    lottoNumberValidator.validate(numbers);

    this.#numbers = numbers;
  }

  getNumbers() {
    return this.#numbers;
  }

  getMatchCount(winningLotto) {
    const numberMatchCount = this.#numbers.filter((number) =>
      winningLotto.getNumbers().includes(number),
    ).length;

    const isBonus = this.#numbers.includes(winningLotto.getBonusNumber());

    return { numberMatchCount, isBonus };
  }

  getRank(winningLotto) {
    const { numberMatchCount, isBonus } = this.getMatchCount(winningLotto);

    if (numberMatchCount === 6) return WINNING_RANK.FIRST;
    if (numberMatchCount === 5 && isBonus) return WINNING_RANK.SECOND;
    if (numberMatchCount === 5) return WINNING_RANK.THIRD;
    if (numberMatchCount === 4) return WINNING_RANK.FOURTH;
    if (numberMatchCount === 3) return WINNING_RANK.FIFTH;
    return WINNING_RANK.NONE;
  }
}
export default Lotto;

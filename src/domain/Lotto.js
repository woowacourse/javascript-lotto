import { PRIZE } from "../constants/system.js";
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

    console.log(
      numberMatchCount,
      isBonus,
      this.#numbers,
      winningLotto.getNumbers(),
      winningLotto.getBonusNumber(),
    );

    return { numberMatchCount, isBonus };
  }

  getRank(winningLotto) {
    const { numberMatchCount, isBonus } = this.getMatchCount(winningLotto);

    if (numberMatchCount === 6) return PRIZE.FIRST;
    if (numberMatchCount === 5 && isBonus) return PRIZE.SECOND;
    if (numberMatchCount === 5) return PRIZE.THIRD;
    if (numberMatchCount === 4) return PRIZE.FOURTH;
    if (numberMatchCount === 3) return PRIZE.FIFTH;
    return PRIZE.NONE;
  }
}
export default Lotto;

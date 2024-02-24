import { NO_MATCH_PLACE, PRIZE } from "../constants/prize-constants.js";
import CommonValidator from "../validator/CommonValidator.js";
import lottoNumberValidator from "../validator/LottoNumberValidator.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers.map((number) => Number(number));
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
    const entry = Object.entries(PRIZE).find(
      ([_, value]) =>
        value.matchCount === numberMatchCount && value.isBonus === isBonus,
    );

    const rank = entry !== undefined ? entry[0] : NO_MATCH_PLACE;
    return rank;
  }
}
export default Lotto;

import { LOTTO_RANGE } from "../constants/constant.js";

class Lotto {
  #numbers;

  constructor() {
    this.#numbers = this.getRandomLotto();
  }

  getRandomLotto() {
    const lottoSet = new Set();

    while (lottoSet.size < LOTTO_RANGE.COUNT) {
      lottoSet.add(
        Math.floor(Math.random() * LOTTO_RANGE.MAX + LOTTO_RANGE.MIN),
      );
    }

    const lottoArray = Array.from(lottoSet);
    lottoArray.sort((a, b) => a - b);

    return lottoArray;
  }

  getRank(winningLotto) {
    const matchCount = this.#countMatches(winningLotto);
    const hasBonus = this.#numbers.some((n) => winningLotto.isBonus(n));

    if (matchCount === 6) return "FIRST";
    if (matchCount === 5 && hasBonus) return "SECOND";
    if (matchCount === 5) return "THIRD";
    if (matchCount === 4) return "FOURTH";
    if (matchCount === 3) return "FIFTH";
  }

  #countMatches(winningLotto) {
    return this.#numbers.filter((n) => winningLotto.hasNumber(n)).length;
  }
}

export default Lotto;

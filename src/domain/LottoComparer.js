import { MIN_MATCH_COUNT } from "../config/const.js";

class LottoComparer {
  #lottos;

  constructor(lottos) {
    this.#lottos = lottos;
  }

  countMatchingNumbers(winningNumbers, bonusNumber) {
    return this.#lottos.reduce((acc, curr) => {
      const matchingCount = curr.compareMatchingNumbers(winningNumbers);
      const isBonus = curr.compareBonusNumbers(bonusNumber);

      return matchingCount < MIN_MATCH_COUNT
        ? acc
        : [...acc, matchingCount === 5 && isBonus ? "bonus" : matchingCount];
    }, []);
  }
}

export default LottoComparer;

import { MIN_MATCH_COUNT } from "../config/const.js";

class LottoComparer {
  #lottoTicket;

  constructor(lottoTicket) {
    this.#lottoTicket = lottoTicket;
  }

  countMatchingNumbers(winningLotto) {
    return this.#lottoTicket.reduce((acc, curr, index) => {
      const matchingCount = curr.compareMatchingNumbers(
        winningLotto.winningNumbers
      );
      if (matchingCount < MIN_MATCH_COUNT) return acc;
      const isBonus = this.#lottoTicket[index].numbers.includes(
        winningLotto.bonusNumber
      );
      if (matchingCount === 5 && isBonus) {
        acc.push("bonus");
        return acc;
      }
      acc.push(matchingCount);
      return acc;
    }, []);
  }
}

export default LottoComparer;

import { BONUS_NUMBER_THRESHOLD, MIN_MATCH_COUNT } from "../config/const.js";

class LottoComparer {
  #lottoTicket;

  constructor(lottoTicket) {
    this.#lottoTicket = lottoTicket;
  }

  #compareMatchingNumbers(winningNumbers, userLotto) {
    return userLotto.reduce((acc, lottoNumber) => {
      if (winningNumbers.includes(lottoNumber)) {
        acc += 1;
      }
      return acc;
    }, 0);
  }

  countMatchingNumbers(winningLotto) {
    console.log(winningLotto.winningNumbers);
    return this.#lottoTicket.reduce((acc, cur, index) => {
      const matchingCount = this.#compareMatchingNumbers(
        winningLotto.winningNumbers,
        cur.numbers
      );
      if (matchingCount < MIN_MATCH_COUNT) return acc;
      const isBonus = this.#lottoTicket[index].numbers.includes(
        winningLotto.bonusNumber
      );
      if (matchingCount === BONUS_NUMBER_THRESHOLD && isBonus) {
        acc.push("bonus");
        return acc;
      }
      acc.push(matchingCount);
      return acc;
    }, []);
  }
}

export default LottoComparer;

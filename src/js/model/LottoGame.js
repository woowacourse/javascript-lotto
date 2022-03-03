import {
  AMOUNT,
  BONUS,
  CONVERT_TO_COUNT_INFO,
  MATCH_COUNT_INFO,
  MATCH_NUMBER,
  WINNER_PRICE,
} from "../utils/constants.js";
import Lotto from "./Lotto.js";

export default class LottoGame {
  constructor() {
    this.lottos = [];
    this.profitRate = 0;
    this.result = {
      [MATCH_COUNT_INFO.THREE]: [WINNER_PRICE.FIFTH, 0],
      [MATCH_COUNT_INFO.FOUR]: [WINNER_PRICE.FOURTH, 0],
      [MATCH_COUNT_INFO.FIVE]: [WINNER_PRICE.THIRD, 0],
      [MATCH_COUNT_INFO.BONUS]: [WINNER_PRICE.SECOND, 0],
      [MATCH_COUNT_INFO.SIX]: [WINNER_PRICE.FRIST, 0],
    };
  }

  getLottoList() {
    return this.lottos;
  }

  getLottoCount() {
    return this.lottos.length;
  }

  #getTicketAmount() {
    return this.getLottoCount() * AMOUNT.UNIT;
  }

  generateLottoTickets(count) {
    this.lottos = Array.from({ length: count }).map(() => {
      const lotto = new Lotto();
      lotto.generateRandomNumber();
      return lotto.numbers;
    });
  }

  generateResult(winningNumbers, bonusNumber) {
    this.#resetResult();
    this.#calculateMatchCount(winningNumbers, bonusNumber);
    this.#calculateProfitRate();
  }

  #calculateMatchCount(winningNumbers, bonusNumber) {
    this.lottos.forEach((lotto) => {
      const matchCount = lotto.filter((number) => winningNumbers.includes(number)).length;
      if (matchCount < MATCH_NUMBER.THREE) {
        return;
      }
      if (matchCount === MATCH_NUMBER.FIVE && lotto.includes(bonusNumber)) {
        this.result[CONVERT_TO_COUNT_INFO[BONUS]][1]++;
        return;
      }
      this.result[CONVERT_TO_COUNT_INFO[matchCount]][1]++;
    });
  }

  #calculateProfitRate() {
    const totalProfit = Object.keys(this.result)
      .map((v) => {
        const [price, count] = this.result[v];
        return price * count;
      })
      .reduce((a, b) => a + b, 0);

    this.profitRate = Math.floor((totalProfit / this.#getTicketAmount()) * 100);
  }

  #resetResult() {
    Object.values(this.result).forEach((v) => (v[1] = 0));
    this.profitRate = 0;
  }
}

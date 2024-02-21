import { WINNING_RULE } from '../constants';

class Statistics {
  #ranks = [];

  #totalPrizes = 0;

  #paymentAmount = 0;

  constructor(paymentAmount) {
    this.#paymentAmount = paymentAmount;
  }

  //result의 결과가 WINNING_RULE에 존재할때, 해당 키 배열 반환
  #checkTicket(result) {
    [...WINNING_RULE].forEach(([key, { matchedCount, isBonus }]) => {
      // TODO 다른 방법 생각해보기
      switch (key) {
        //five and Bonus
        case 2:
          if (matchedCount === result.matchedCount && result.isBonus)
            this.#ranks.push(key);
          break;
        //five
        case 3:
          if (matchedCount === result.matchedCount && !result.isBonus)
            this.#ranks.push(key);
          break;
        // 기타
        default:
          if (matchedCount === result.matchedCount) {
            this.#ranks.push(key);
          }
          break;
      }
    });
  }

  checkTickets(results) {
    results.forEach((result) => {
      this.#checkTicket(result);
    });

    return this.#ranks;
  }

  #calculateTotalPrize() {
    this.#totalPrizes = this.#ranks.reduce((totalPrizes, rank) => {
      return totalPrizes + WINNING_RULE.get(rank).money;
    }, 0);
  }

  get profitRate() {
    this.#calculateTotalPrize();
    return Number(((this.#totalPrizes / this.#paymentAmount) * 100).toFixed(1));
  }
}

export default Statistics;

import { WINNING_RULE } from '../constants';

class Statistics {
  #ranks = [];

  #totalPrizes = 0;

  #paymentAmount = 0;

  constructor(paymentAmount) {
    this.#paymentAmount = paymentAmount;
  }

  #pushRankAboutFiveAndBonusMatches({ matchedCount, result }, key) {
    if (matchedCount === result.matchedCount && result.isBonus) {
      this.#ranks.push(key);
    }
  }

  #pushRankAboutFiveMatches({ matchedCount, result }, key) {
    if (matchedCount === result.matchedCount && !result.isBonus) {
      this.#ranks.push(key);
    }
  }

  #pushOtherRank({ matchedCount, result }, key) {
    if (matchedCount === result.matchedCount) {
      this.#ranks.push(key);
    }
  }

  // {matchedCount: 5, isBonus: false}
  // result의 결과가 WINNING_RULE에 존재할때, 해당 키 배열 반환
  #checkTicket(result) {
    WINNING_RULE.forEach((value, key) => {
      const { matchedCount, isBonus } = value;
      // TODO 다른 방법 생각해보기
      // 방법1
      const checkBonusMatch = matchedCount === 5;

      if (matchedCount !== result.matchedCount) return;

      if (checkBonusMatch && isBonus === result.isBonus) {
        this.#ranks.push(key);
      } else if (!checkBonusMatch) {
        this.#ranks.push(key);
      }
      // 방법2
      // switch (key) {
      //   // five and Bonus
      //   case 2:
      //     this.#pushRankAboutFiveAndBonusMatches({ matchedCount, result }, key);
      //     break;

      //   // five
      //   case 3:
      //     this.#pushRankAboutFiveMatches({ matchedCount, result }, key);
      //     break;

      //   // 기타
      //   default:
      //     this.#pushOtherRank({ matchedCount, result }, key);
      //     break;
      // }
    });
  }

  checkTickets(results) {
    results.forEach((result) => {
      this.#checkTicket(result);
    });

    return this.#ranks;
  }

  #calculateTotalPrize() {
    this.#totalPrizes = this.#ranks.reduce(
      (totalPrizes, rank) => totalPrizes + WINNING_RULE.get(rank).money,
      0,
    );
  }

  get profitRate() {
    this.#calculateTotalPrize();
    return Number(((this.#totalPrizes / this.#paymentAmount) * 100).toFixed(1));
  }
}

export default Statistics;

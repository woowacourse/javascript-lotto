import { INITIAL_NUMBER, ONE_TICKET } from '../constants.js';

class LottoStatistics {
  #rankResult;

  constructor() {
    this.#rankResult = {
      first: { count: 0, price: 2000000000 },
      second: { count: 0, price: 30000000 },
      third: { count: 0, price: 1500000 },
      fourth: { count: 0, price: 50000 },
      fifth: { count: 0, price: 5000 },
    };
  }

  getRankResult() {
    return this.#rankResult;
  }

  compareLottos(machineLottos, winningNumber) {
    machineLottos.forEach((machineLotto) => {
      const machineLottoNumbers = machineLotto.getNumbers();
      const sameCount = this.matchSameCount(
        machineLottoNumbers,
        winningNumber.lotto,
      );
      const isBonusNumber = this.hasBonusNumber(
        machineLottoNumbers,
        winningNumber.bonus,
      );
      this.determineRank(sameCount, isBonusNumber);
    });
  }

  determineRank(sameCount, isBonusNumber) {
    if (sameCount === 6) this.#rankResult.first.count += ONE_TICKET;
    if (sameCount === 5 && isBonusNumber)
      this.#rankResult.second.count += ONE_TICKET;
    if (sameCount === 5 && !isBonusNumber)
      this.#rankResult.third.count += ONE_TICKET;
    if (sameCount === 4) this.#rankResult.fourth.count += ONE_TICKET;
    if (sameCount === 3) this.#rankResult.fifth.count += ONE_TICKET;
  }

  hasBonusNumber(machineLotto, bonus) {
    return machineLotto.includes(bonus);
  }

  matchSameCount(machineLotto, winningLotto) {
    return machineLotto.filter((number) => winningLotto.includes(number))
      .length;
  }

  calculateRevenueRate(profit, investmentCost) {
    return Number(((profit / investmentCost) * 100).toFixed(1));
  }

  getProfit() {
    return Object.keys(this.#rankResult).reduce(
      (acc, key) =>
        acc + this.#rankResult[key].price * this.#rankResult[key].count,
      INITIAL_NUMBER,
    );
  }
}

export default LottoStatistics;

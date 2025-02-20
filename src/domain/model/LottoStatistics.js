import CONFIG from '../../constants/config.js';

class LottoStatistics {
  #rankResult;

  constructor() {
    this.#rankResult = {
      '3개 일치': { count: 0, price: 5000 },
      '4개 일치': { count: 0, price: 50000 },
      '5개 일치': { count: 0, price: 1500000 },
      '5개 일치, 보너스 볼 일치': { count: 0, price: 30000000 },
      '6개 일치': { count: 0, price: 2000000000 },
    };
  }

  getRankResult() {
    return this.#rankResult;
  }

  compareLottos(machineLottos, winningNumber) {
    machineLottos.forEach((machineLotto) => {
      const sameCount = this.matchSameCount(machineLotto.getNumbers(), winningNumber.lotto);
      const isBonusNumber = this.hasBonusNumber(machineLotto.getNumbers(), winningNumber.bonus);
      this.determineRank(sameCount, isBonusNumber);
    });
  }

  determineRank(sameCount, isBonusNumber) {
    if (sameCount === 5 && isBonusNumber) {
      return this.increaseCount(sameCount, CONFIG.RANK_OBJECT_KEY.BONUS(sameCount));
    }

    return this.increaseCount(sameCount, CONFIG.RANK_OBJECT_KEY(sameCount));
  }

  hasBonusNumber(machineLotto, bonus) {
    return machineLotto.includes(bonus);
  }

  matchSameCount(machineLotto, winningLotto) {
    return machineLotto.filter((number) => winningLotto.includes(number)).length;
  }

  increaseCount(sameCount, name) {
    if (sameCount < CONFIG.MIN.RANK_COUNT) {
      return;
    }
    this.#rankResult[name].count += 1;
  }

  calculateRevenueRate(profit, investmentCost) {
    return Number(((profit / investmentCost) * 100).toFixed(1));
  }

  getProfit() {
    return Object.keys(this.#rankResult).reduce(
      (acc, key) => acc + (this.#rankResult[key].price * this.#rankResult[key].count),
      CONFIG.INITIAL_NUMBER,
    );
  }
}

export default LottoStatistics;

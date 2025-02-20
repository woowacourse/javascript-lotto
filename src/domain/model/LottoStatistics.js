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
      const machineLottoNumbers = machineLotto.getNumbers();
      const sameCount = this.matchSameCount(machineLottoNumbers, winningNumber.lotto);
      const isBonusNumber = this.hasBonusNumber(machineLottoNumbers, winningNumber.bonus);
      this.determineRank(sameCount, isBonusNumber);
    });
  }

  determineRank(sameCount, isBonusNumber) {
    if (sameCount === CONFIG.SECOND_PRIZE_MATCH_COUNT && isBonusNumber) {
      return this.increaseCount(sameCount, CONFIG.RANK_OBJECT_KEY.BONUS(sameCount));
    }

    return this.increaseCount(sameCount, CONFIG.RANK_OBJECT_KEY.NORMAL(sameCount));
  }

  hasBonusNumber(machineLotto, bonus) {
    return machineLotto.includes(bonus);
  }

  matchSameCount(machineLotto, winningLotto) {
    return machineLotto.filter((number) => winningLotto.includes(number)).length;
  }

  increaseCount(sameCount, name) {
    const ONE_TICKET = 1;
    if (sameCount < CONFIG.MIN.RANK_COUNT) {
      return;
    }
    this.#rankResult[name].count += ONE_TICKET;
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

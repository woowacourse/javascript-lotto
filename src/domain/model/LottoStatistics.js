import CONFIG from '../../constants/config.js';

class LottoStatistics {
  #rankResult;

  constructor() {
    this.init();
  }

  init() {
    this.#rankResult = {
      '3개 일치': { name: '3', count: 0, price: 5000 },
      '4개 일치': { name: '4', count: 0, price: 50000 },
      '5개 일치': { name: '5', count: 0, price: 1500000 },
      '5개 일치, 보너스 볼 일치': { name: '5+1', count: 0, price: 30000000 },
      '6개 일치': { name: '6', count: 0, price: 2000000000 },
    };
  }

  compareLottos(userLottos, winningLotto) {
    userLottos.forEach((userLotto) => {
      const sameNumberCount = userLotto.getMatchedNumberCount(winningLotto.lottoNumber);
      const isIncludedBonusNumber = userLotto.hasNumber(winningLotto.bonusNumber);
      this.determineRank(sameNumberCount, isIncludedBonusNumber);
    });
    return this.#rankResult;
  }

  determineRank(sameNumberCount, isIncludedBonusNumber) {
    if (sameNumberCount === CONFIG.RANK.SECOND_PRIZE_MATCH_COUNT && isIncludedBonusNumber) {
      return this.increaseCount(sameNumberCount, CONFIG.RANK.OBJECT_KEY.BONUS(sameNumberCount));
    }

    return this.increaseCount(sameNumberCount, CONFIG.RANK.OBJECT_KEY.NORMAL(sameNumberCount));
  }

  increaseCount(sameCount, name) {
    const ONE_TICKET = 1;
    if (sameCount < CONFIG.RANK.MIN_COUNT) {
      return;
    }
    this.#rankResult[name].count += ONE_TICKET;
  }

  calculateProfit() {
    return Object.keys(this.#rankResult).reduce(
      (acc, key) => acc + (this.#rankResult[key].price * this.#rankResult[key].count),
      CONFIG.INITIAL_PROFIT,
    );
  }
}

export default LottoStatistics;

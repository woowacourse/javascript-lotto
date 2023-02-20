const { PROFIT_PER_RANK, PRICE_UNIT } = require('../../constants/constants');
const { randomNumberGenerator } = require('../../utils/RandomNumberGenerator');
const Lotto = require('./Lotto');

class Lottos {
  #lottos;

  #ranks = new Array(PROFIT_PER_RANK.length).fill(0);

  constructor(lottoCount) {
    const lottos = Array.from({ length: lottoCount }).map(() =>
      randomNumberGenerator.generateLottoNumbers()
    );

    this.#lottos = lottos.map((lottoNumber) => new Lotto(lottoNumber));
  }

  getLottos() {
    return this.#lottos;
  }

  getAllRanks() {
    return this.#ranks;
  }

  calculateAllRanks(winningNumbers, bonusNumber) {
    this.#lottos.forEach((lotto) => {
      lotto.calculateRank(winningNumbers, bonusNumber);

      this.#calculateRank(lotto.getRank());
    });
  }

  #calculateRank(lottoRank) {
    if (lottoRank === undefined) return;

    const rankIndex = lottoRank - 1;

    this.#ranks[rankIndex] += 1;
  }

  getProfitRate() {
    const profitRate = this.#calculateProfitRate();
    return profitRate;
  }

  #calculateProfitRate() {
    const profit = this.#calculateProfit();
    const purchasedPrice = this.#lottos.length * PRICE_UNIT;

    return (profit / purchasedPrice).toFixed(1);
  }

  #calculateProfit() {
    return this.#ranks.reduce(
      (profit, rankCount, index) => profit + rankCount * PROFIT_PER_RANK[index],
      0
    );
  }
}
module.exports = Lottos;

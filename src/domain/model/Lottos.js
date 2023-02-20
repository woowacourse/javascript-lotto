const { profitByRank, PRICE_UNIT } = require('../../constants/constants');
const { randomNumberGenerator } = require('../../utils/randomNumberGenerator');
const Lotto = require('./Lotto');

class Lottos {
  #lottos;

  #ranks;

  constructor(lottoCount) {
    const lottos = [];

    while (lottos.length < lottoCount) {
      lottos.push(randomNumberGenerator.generateLottoNumbers());
    }

    this.#lottos = lottos.map((lottoNumber) => new Lotto(lottoNumber));
    this.#ranks = new Array(profitByRank.length).fill(0);
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
    return this.#ranks.reduce((profit, rankCount, index) => {
      const currentRankProfit = rankCount * profitByRank[index];

      return profit + currentRankProfit;
    }, 0);
  }
}
module.exports = Lottos;

const { profitByRank } = require('../../constants/constants');
const { randomNumberGenerator } = require('../../utils/RandomNumberGenerator');
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

      this.calculateRank(lotto.getRank());
    });
  }

  calculateRank(lottoRank) {
    if (lottoRank === undefined) return;

    const rankIndex = lottoRank - 1;

    this.#ranks[rankIndex] += 1;
  }
}
module.exports = Lottos;

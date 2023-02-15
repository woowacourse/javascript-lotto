const Lotto = require("./Lotto");
const Random = require("../util/Random");
const WinLotto = require("../domain/WinLotto");

const LottoGame = {
  lottos: [],
  rankResult: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },

  LottoNumberGenerator() {
    const lottoNumbers = new Set();
    while (lottoNumbers.size < 6) {
      lottoNumbers.add(Random.RandomMinMax(1, 45));
    }
    return Array.from(lottoNumbers);
  },

  makeLottos(lottoCount) {
    Array.from({ length: lottoCount }, () => {
      const lottoOne = new Lotto(this.LottoNumberGenerator());
      this.lottos.push(lottoOne);
    });
  },

  makeWinLotto(winningNumbers, bonusNumber) {
    const winlotto = new WinLotto(winningNumbers, bonusNumber);
    this.rankResult = winlotto.calculateWinLotto(this.lottos, this.rankResult);

    const revenue = winlotto.calculateRevenue(rankResult, lottos.length);
    return [revenue, rankResult];
  },
};

module.exports = LottoGame;

console.log((10000 / 3).toFixed(2));

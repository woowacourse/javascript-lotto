const Lotto = require("./Lotto");
const Random = require("../util/Random");

const LottoGame = {
  lottos: [],

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
};

module.exports = LottoGame;

const Lotto = require("./Lotto");
const Random = require("../util/Random");

const LottoGame = {
  LottoNumberGenerator() {
    const lottoNumbers = new Set();
    while (lottoNumbers.size < 6) {
      lottoNumbers.add(Random.RandomMinMax(1, 45));
    }
    return Array.from(lottoNumbers);
  },

  makeLottos(lottoCount) {},
};

LottoGame.LottoNumberGenerator();

module.exports = LottoGame;

const Lotto = require("./Lotto");
const Random = require("../util/Random");
const WinLotto = require("../domain/WinLotto");

const RANK_RESULT = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
const PRIZE = { 1: 2000000000, 2: 30000000, 3: 1500000, 4: 50000, 5: 5000 };

class LottoGame {
  #lottos;
  #rankResult;
  #winLottos;

  constructor() {
    this.#lottos = [];
    this.#rankResult = { ...RANK_RESULT };
  }

  get rankResult() {
    return this.#rankResult;
  }

  get lottos() {
    return this.#lottos;
  }

  get lottoCount() {
    return this.#lottos.length;
  }

  LottoNumberGenerator() {
    const lottoNumbers = new Set();
    while (lottoNumbers.size < 6) {
      lottoNumbers.add(Random.RandomMinMax(1, 45));
    }
    return Array.from(lottoNumbers);
  }

  makeLottos(money) {
    const lottoCount = parseInt(money / 1000);
    Array.from({ length: lottoCount }, () => {
      const lottoOne = new Lotto(this.LottoNumberGenerator());
      this.lottos.push(lottoOne);
    });
  }

  makeWinLotto(winningNumbers, bonusNumber) {
    this.#winLottos = new WinLotto(winningNumbers, bonusNumber);
  }

  calculateRankResult() {
    this.#lottos.forEach((lotto) => {
      const rank = this.#calculateRank(lotto);
      this.#rankResult[rank] += 1;
    });
  }

  #calculateRank(lotto) {
    const winNumbers = this.#winLottos.numbers;
    const sameNumbers = lotto.numbers.filter((num) => winNumbers.includes(num));

    if (sameNumbers.length === 6) return 1;
    if (sameNumbers.length === 5)
      return lotto.numbers.includes(this.#winLottos.bonusNumber) ? 2 : 3;
    if (sameNumbers.length === 4) return 4;
    if (sameNumbers.length === 3) return 5;
    if (sameNumbers.length < 3) return 0;
  }

  returnRevenueRate() {
    const revenue = Object.keys(PRIZE).reduce(
      (result, current) => result + PRIZE[current] * this.#rankResult[current],
      0
    );

    return (revenue / (this.#lottos.length * 10)).toFixed(1);
  }
}

module.exports = LottoGame;

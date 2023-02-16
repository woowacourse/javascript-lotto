const Lotto = require("./Lotto");
const WinLotto = require("../domain/WinLotto");
const Random = require("../util/Random");
const {
  PRIZE,
  RANK,
  RANK_BY_CORRECTCOUNT,
  LOTTO_INFO,
} = require("../constant/Constant");

const RANK_RESULT = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

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

  #LottoNumberGenerator() {
    const lottoNumbers = new Set();
    while (lottoNumbers.size < LOTTO_INFO.SIZE) {
      lottoNumbers.add(Random.RandomMinMax(LOTTO_INFO.MIN, LOTTO_INFO.MAX));
    }
    return Array.from(lottoNumbers);
  }

  makeLottos(money) {
    const lottoCount = parseInt(money / 1000);
    Array.from({ length: lottoCount }, () => {
      const lottoOne = new Lotto(this.#LottoNumberGenerator());
      this.lottos.push(lottoOne);
    });
  }

  makeWinLotto(winningNumbers, bonusNumber) {
    this.#winLottos = new WinLotto(winningNumbers, bonusNumber);
  }

  #calculateRank(lotto) {
    const winNumbers = this.#winLottos.numbers;
    const numbers = lotto.numbers;

    const sameNumbers = numbers.filter((num) => winNumbers.includes(num));
    const correctCount = sameNumbers.length;
    if (correctCount === 5 && numbers.includes(this.#winLottos.bonusNumber))
      return RANK.SECOND;

    return RANK_BY_CORRECTCOUNT[correctCount];
  }

  calculateRankResult() {
    this.#lottos.forEach((lotto) => {
      const rank = this.#calculateRank(lotto);
      this.#rankResult[rank]++;
    });
  }

  returnRevenueRate() {
    const revenue = Object.keys(PRIZE).reduce(
      (result, rank) => result + PRIZE[rank] * this.#rankResult[rank],
      0
    );

    return (revenue / (this.#lottos.length * 10)).toFixed(1);
  }
}

module.exports = LottoGame;

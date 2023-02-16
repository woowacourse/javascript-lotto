const Lotto = require("./Lotto");
const WinLotto = require("../domain/WinLotto");
const Random = require("../util/Random");
const {
  PRIZE,
  RANK,
  RANK_BY_CORRECTCOUNT,
  LOTTO,
} = require("../constant/Constant");

const RANK_RESULT = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

class LottoGame {
  #lottos;
  #winLottos;

  constructor() {
    this.#lottos = [];
  }

  get lottos() {
    return this.#lottos;
  }

  get lottoCount() {
    return this.#lottos.length;
  }

  #LottoNumberGenerator() {
    const lottoNumbers = new Set();
    while (lottoNumbers.size < LOTTO.SIZE) {
      lottoNumbers.add(Random.RandomMinMax(LOTTO.MIN, LOTTO.MAX));
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

  makeWinLotto(winNumbers, bonusNumber) {
    this.#winLottos = new WinLotto(winNumbers, bonusNumber);
  }

  calculateRank(numbers) {
    const winNumbers = this.#winLottos.numbers;

    const sameNumbers = numbers.filter((num) => winNumbers.includes(num));
    const correctCount = sameNumbers.length;
    if (correctCount === 5 && numbers.includes(this.#winLottos.bonusNumber))
      return RANK.SECOND;

    return RANK_BY_CORRECTCOUNT[correctCount];
  }

  calculateRankResult() {
    const rankResult = { ...RANK_RESULT };

    this.#lottos.forEach((lotto) => {
      const rank = this.calculateRank(lotto.numbers);
      rankResult[rank]++;
    });

    return rankResult;
  }

  calculateRevenueRate(rankResult) {
    const revenue = Object.keys(PRIZE).reduce(
      (result, rank) => result + PRIZE[rank] * rankResult[rank],
      0
    );

    return (revenue / (this.#lottos.length * 10)).toFixed(1);
  }
}

module.exports = LottoGame;

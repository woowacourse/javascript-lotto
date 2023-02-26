const Lotto = require("./Lotto");
const WinLotto = require("../domain/WinLotto");
const Random = require("../util/Random");
const { prizeAmount, rankLotto, lottoProperty } = require("../constant/Constant");

const RANK_RESULT = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
class LottoGame {
  #lottos;

  get lottos() {
    return this.#lottos;
  }

  #LottoNumberGenerator() {
    const lottoNumbers = new Set();
    while (lottoNumbers.size < lottoProperty.SIZE) {
      lottoNumbers.add(Random.RandomMinMax(lottoProperty.MIN, lottoProperty.MAX));
    }
    return Array.from(lottoNumbers);
  }

  purchaseLottos(money) {
    const lottoCount = parseInt(money / 1000);

    const lottos = [];
    Array.from({ length: lottoCount }, () => {
      const lottoOne = new Lotto(this.#LottoNumberGenerator());
      lottos.push(lottoOne);
    });

    this.#lottos = lottos;
  }

  makeWinLotto(winNumbers, bonusNumber) {
    return new WinLotto(winNumbers, bonusNumber);
  }

  #rankbyCorrectCount(correctCount, isBonusNumberMatch) {
    if (correctCount === 6) return rankLotto.FIRST;
    if (correctCount === 5 && isBonusNumberMatch) return rankLotto.SECOND;
    if (correctCount === 5) return rankLotto.THIRD;
    if (correctCount === 4) return rankLotto.FOURTH;
    if (correctCount === 3) return rankLotto.FIFTH;
    if (correctCount < 3) return rankLotto.LOSER;
  }

  calculateRank(lotto, winLotto) {
    const numbers = lotto.numbers;
    const winNumbers = winLotto.numbers;
    const sameNumbers = numbers.filter((num) => winNumbers.includes(num));

    const correctCount = sameNumbers.length;
    const isBonusNumberMatch = numbers.includes(winLotto.bonusNumber);
    const rank = this.#rankbyCorrectCount(correctCount, isBonusNumberMatch);

    return rank;
  }

  calculateRankResult(lottos, winLotto) {
    const rankResult = lottos.reduce(
      (rankResult, lotto) => {
        const rank = this.calculateRank(lotto, winLotto);
        rankResult[rank]++;
        return rankResult;
      },
      { ...RANK_RESULT }
    );

    return rankResult;
  }

  calculateRevenueRate(rankResult, lottoCount) {
    const revenue = Object.keys(prizeAmount).reduce((result, index) => result + prizeAmount[index] * rankResult[index], 0);

    return (revenue / (lottoCount * 10)).toFixed(1);
  }
}

module.exports = LottoGame;

import NUMBER from '../constants/number';
import WINNER from '../constants/winner';
import Random from '../util/Random';
import Lotto from './Lotto';

const LottoService = {
  getLottos(count = 0) {
    return Array.from(
      { length: count },
      () =>
        new Lotto(
          Random.pickUniqueNumbersInRange({
            from: NUMBER.LOTTO_START_NUMBER,
            to: NUMBER.LOTTO_END_NUMBER,
            size: NUMBER.LOTTO_LENGTH,
          })
        )
    );
  },

  getRankIndex(matchCount = 0, matchBonus = false) {
    switch (matchCount) {
      case WINNER.FIFTH.MATCH_COUNT:
        return WINNER.FIFTH.INDEX;
      case WINNER.FOURTH.MATCH_COUNT:
        return WINNER.FOURTH.INDEX;
      case WINNER.THIRD.MATCH_COUNT:
        return matchBonus ? WINNER.THIRD.INDEX : WINNER.FIRST.INDEX;
      case WINNER.SECOND.MATCH_COUNT:
        return WINNER.SECOND.INDEX;
      default:
        return WINNER.FIRST.INDEX;
    }
  },

  mapWinningCountToPrizes(winningCount = []) {
    const RANK = ['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH'];
    return winningCount
      .map((count, index) => {
        const currentRank = RANK[index];
        const { MATCH_COUNT, IS_BONUS, PRICE } = WINNER[currentRank];
        return [MATCH_COUNT, IS_BONUS, PRICE, count];
      })
      .reverse();
  },

  getResult({ randomLottos = [], winLotto = {}, bonusNumber = 0 }) {
    const winningNubmer = randomLottos.reduce(
      (acc, lotto) => {
        const matchCount = lotto.matchLottoNumbers(winLotto);
        this.increaseLottoResult({ matchCount, lotto, bonusNumber, acc });
        return acc;
      },
      Array.from({ length: Object.keys(WINNER).length }, () => 0)
    );
    return this.mapWinningCountToPrizes(winningNubmer);
  },

  increaseLottoResult({ matchCount, lotto, bonusNumber, acc }) {
    if (matchCount >= WINNER.FIFTH.MATCH_COUNT) {
      const rankIndex = this.getRankIndex(matchCount, lotto.hasBonus(bonusNumber));
      acc[rankIndex] += 1;
    }
  },

  getRateOfRevenue(result = 0, lottoCount = 0) {
    const revenue = result.reduce((totalRevenue, eachResult) => {
      const [, , price, winCount] = eachResult;
      return totalRevenue + price * winCount;
    }, 0);

    return ((revenue / (lottoCount * NUMBER.LOTTO_PRICE)) * 100).toFixed(1);
  },

  calculateResult({ randomLottos, winLotto, bonusNumber, lottoCount }) {
    const result = LottoService.getResult({ randomLottos, winLotto, bonusNumber });
    const rateOfRevenue = LottoService.getRateOfRevenue(result, lottoCount);

    return [result, rateOfRevenue];
  },

  wrapArrayToLotto(winNumbers = []){
    return new Lotto(winNumbers);
  },

  getPurchaseCount(purchaseAmount){
    return Number.parseInt(purchaseAmount / NUMBER.LOTTO_PRICE, 10);
  }
};

export default LottoService;

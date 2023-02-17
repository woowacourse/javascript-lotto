import Random from '../util/Random.js';
import Lotto from './Lotto.js';
import {
  LOTTO_RULE,
  LOTTO_PRIZE,
  RANK_BY_COUNT,
  PRIZE_BY_RANK,
} from '../constant/constants.js';

class LottoGame {
  #lottos;

  #rankingBoard = {
    [LOTTO_PRIZE.rankNone]: 0,
    [LOTTO_PRIZE.rank5]: 0,
    [LOTTO_PRIZE.rank4]: 0,
    [LOTTO_PRIZE.rank3]: 0,
    [LOTTO_PRIZE.rank2]: 0,
    [LOTTO_PRIZE.rank1]: 0,
  };

  constructor(money) {
    const count = Math.floor(money / LOTTO_RULE.price);
    this.#lottos = Array.from({ length: count }, () => {
      const randomNumbers = Random.generateUniqueNumbersInRange(
        LOTTO_RULE.size,
        LOTTO_RULE.minNumber,
        LOTTO_RULE.maxNumber,
      );

      return new Lotto(randomNumbers);
    });
  }

  convertCountToRank(intersectCount, hasBonus) {
    const rank = RANK_BY_COUNT[intersectCount];
    if (!rank) return LOTTO_PRIZE.rankNone;
    if (rank === LOTTO_PRIZE.rank3 && hasBonus) return LOTTO_PRIZE.rank2;
    return rank;
  }

  updateRankingBoard(winningNumbers, bonusNumber) {
    this.#lottos.forEach((lotto) => {
      const intersectCount = lotto.countIntersect(winningNumbers);
      const hasBonus = lotto.includes(bonusNumber);
      const rank = this.convertCountToRank(intersectCount, hasBonus);
      this.#rankingBoard[rank] += 1;
    });

    return this;
  }

  getRankingBoard() {
    return { ...this.#rankingBoard };
  }

  static calculateTheChange(money) {
    return money % LOTTO_RULE.price;
  }

  getEarningRate() {
    const earningSum = Object.entries(this.#rankingBoard)
      .reduce((acc, [rank, count]) => acc + (PRIZE_BY_RANK[rank] * count), 0);

    const purchaseMoney = this.#lottos.length * LOTTO_RULE.price;
    return (earningSum / purchaseMoney) * 100;
  }

  getLottos() {
    return this.#lottos.map((lotto) => lotto.getNumbers());
  }
}

export default LottoGame;

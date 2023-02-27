import Random from '../util/Random.js';
import Lotto from './Lotto.js';
import {
  LOTTO_RULE,
  LOTTO_PRIZE,
} from '../constant/constants.js';
import LottoGameCalculator from './LottoGameCalculator.js';

class LottoGame {
  #lottos;

  #rankingBoard;

  constructor(money = 0) {
    this.reset();
    this.buyLottos(money);
  }

  reset() {
    this.#lottos = [];
    this.#rankingBoard = {
      [LOTTO_PRIZE.rankNone]: 0,
      [LOTTO_PRIZE.rank5]: 0,
      [LOTTO_PRIZE.rank4]: 0,
      [LOTTO_PRIZE.rank3]: 0,
      [LOTTO_PRIZE.rank2]: 0,
      [LOTTO_PRIZE.rank1]: 0,
    };
  }

  buyLottos(money) {
    const count = Math.floor(money / LOTTO_RULE.price);
    Array.from(
      { length: count },
      () => {
        const randomNumbers = Random.generateUniqueNumbersInRange(
          LOTTO_RULE.size,
          LOTTO_RULE.minNumber,
          LOTTO_RULE.maxNumber,
        );

        return new Lotto(randomNumbers);
      },
    ).forEach((lotto) => this.#lottos.push(lotto));
  }

  updateRankingBoard(winningNumbers, bonusNumber) {
    if (Object.values(this.#rankingBoard).reduce((prev, value) => prev + value, 0) > 0) {
      this.#rankingBoard = {
        [LOTTO_PRIZE.rankNone]: 0,
        [LOTTO_PRIZE.rank5]: 0,
        [LOTTO_PRIZE.rank4]: 0,
        [LOTTO_PRIZE.rank3]: 0,
        [LOTTO_PRIZE.rank2]: 0,
        [LOTTO_PRIZE.rank1]: 0,
      };
    }

    this.#lottos.forEach((lotto) => {
      const intersectCount = lotto.countIntersect(winningNumbers);
      const hasBonus = lotto.includes(bonusNumber);
      const rank = LottoGameCalculator.convertCountToRank(intersectCount, hasBonus);
      this.#rankingBoard[rank] += 1;
    });

    return this;
  }

  getRankingBoard() {
    return { ...this.#rankingBoard };
  }

  getLottos() {
    return this.#lottos.map((lotto) => lotto.getNumbers());
  }

  getEarningRate() {
    const purchaseMoney = LOTTO_RULE.price * this.#lottos.length;
    return LottoGameCalculator.getEarningRate(this.getRankingBoard(), purchaseMoney);
  }
}

export default LottoGame;

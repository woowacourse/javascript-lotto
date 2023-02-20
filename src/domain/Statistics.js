import deepFreeze from '../util/deepFreeze.js';

export default class Statistics {
  #winningLotto;

  #board;

  constructor(winningLotto) {
    this.#winningLotto = winningLotto;
    this.#board = {
      first: this.#generateRank(2_000_000_000),
      second: this.#generateRank(30_000_000),
      third: this.#generateRank(1_500_000),
      fourth: this.#generateRank(50_000),
      fifth: this.#generateRank(5_000),
    };
  }

  setCountByWinningPlace(lottos) {
    lottos.forEach((lotto) => {
      const { count, hasBonus } = this.#getWinningChecks(lotto);

      if (count === 6) return this.#board.first.countOnce();
      if (count === 5 && hasBonus) return this.#board.second.countOnce();
      if (count === 5) return this.#board.third.countOnce();
      if (count === 4) return this.#board.fourth.countOnce();
      if (count === 3) return this.#board.fifth.countOnce();
    });
    return this;
  }

  getStatisticsResult() {
    return deepFreeze(this.#board);
  }

  setLottoYield(lottoPrice, lottoCount) {
    this.#board.lottoYield =
      (this.#getTotalWinnings() / this.#getTotalPurchased(lottoPrice, lottoCount)) * 100;

    return this;
  }

  #getTotalWinnings() {
    return [...Object.values(this.#board)].reduce(
      (lottoYield, rank) => lottoYield + rank.getCount() * rank.getPrize(),
      0
    );
  }

  #getTotalPurchased(lottoPrice, lottoCount) {
    return lottoPrice * lottoCount;
  }

  #getWinningChecks(lotto) {
    return {
      count: this.#winningLotto.compare(lotto),
      hasBonus: this.#winningLotto.hasBonus(lotto),
    };
  }

  #generateRank(prize, count = 0) {
    return {
      getPrize: () => prize,
      getCount: () => count,
      countOnce: () => ++count,
    };
  }
}

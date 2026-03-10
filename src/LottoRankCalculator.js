import { RANK_RULES } from './constants/rank.js';

const LottoRankCalculator = {
  calculateLottoRanks(lottos, winningLottoAndBonusNumber) {
    const ranks = RANK_RULES.reduce((prev, cur) => {
      prev[cur.rank] = 0;
      return prev;
    }, {});

    lottos.forEach((lotto) => {
      const rank = winningLottoAndBonusNumber.calculateRank(lotto);
      if (!rank) return;

      ranks[rank] += 1;
    });

    return ranks;
  },
};

export default LottoRankCalculator;

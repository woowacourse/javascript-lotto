import {
  LOTTO_RULE,
  LOTTO_PRIZE,
  RANK_BY_COUNT,
  PRIZE_BY_RANK,
} from '../constant/constants.js';

const LottoGameCalculator = {
  convertCountToRank(intersectCount, hasBonus) {
    const rank = RANK_BY_COUNT[intersectCount];
    if (!rank) return LOTTO_PRIZE.rankNone;
    if (rank === LOTTO_PRIZE.rank3 && hasBonus) return LOTTO_PRIZE.rank2;
    return rank;
  },

  getEarningRate(rankingBoard, purchaseMoney) {
    const earningSum = Object.entries(rankingBoard)
      .reduce((acc, [rank, count]) => acc + (PRIZE_BY_RANK[rank] * count), 0);
    return (earningSum / purchaseMoney) * 100;
  },

  getTheChange(money) {
    return money % LOTTO_RULE.price;
  },
};

export default LottoGameCalculator;

const LottoRank = {
  PRIZE: {
    FIRST: { MATCH_COUNT: 6, RANK: 1 },
    SECOND: { MATCH_COUNT: 5, RANK: 2 },
    THIRD: { MATCH_COUNT: 5, RANK: 3 },
    FOURTH: { MATCH_COUNT: 4, RANK: 4 },
    FIFTH: { MATCH_COUNT: 3, RANK: 5 },
    MISS: { RANK: 0 },
  },

  getWinRank(matchCount, hasBonus) {
    if (matchCount === LottoRank.PRIZE.THIRD.MATCH_COUNT) {
      return hasBonus ? LottoRank.PRIZE.SECOND.RANK : LottoRank.PRIZE.THIRD.RANK;
    }
    if (matchCount < LottoRank.PRIZE.FIFTH.MATCH_COUNT) {
      return LottoRank.PRIZE.MISS.RANK;
    }
    return this.findWinRank(matchCount);
  },

  findWinRank(matchCount) {
    return Object.values(LottoRank.PRIZE).find(({ MATCH_COUNT }) => MATCH_COUNT === matchCount)
      .RANK;
  },
};

export default LottoRank;

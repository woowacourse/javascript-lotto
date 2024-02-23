const LottoRankMaker = {
  calculateLottoRank(lottoResult) {
    return lottoResult.reduce(
      (ranks, result) => {
        const normalCount = result.normalNumber;
        const bonusCount = result.bonusNumber;
        if (normalCount === 6) {
          ranks[1] += 1;
        } else if (normalCount === 5 && bonusCount === 1) {
          ranks[2] += 1;
        } else if (normalCount === 5) {
          ranks[3] += 1;
        } else if (normalCount === 4) {
          ranks[4] += 1;
        } else if (normalCount === 3) {
          ranks[5] += 1;
        }
        return ranks;
      },
      { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    );
  },
};
export default LottoRankMaker;

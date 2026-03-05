const RETURN_AMOUNT_BY_RANK = {
  1: 2000000000,
  2: 30000000,
  3: 1500000,
  4: 50000,
  5: 5000,
};

class LottoReturnCalculator {
  static calculateReturnAmount(rank) {
    return Object.entries(rank).reduce((sum, [r, c]) => {
      rank[r] = c * RETURN_AMOUNT_BY_RANK[r];
      return sum + rank[r];
    }, 0);
  }
}

export default LottoReturnCalculator;

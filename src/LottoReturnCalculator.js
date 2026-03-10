const RETURN_AMOUNT_BY_RANK = {
  1: 2000000000,
  2: 30000000,
  3: 1500000,
  4: 50000,
  5: 5000,
  6: 0,
};

const LottoReturnCalculator = {
  calculateReturnAmount(rank) {
    return Object.entries(rank).reduce((sum, [r, c]) => {
      const returnAmount = c * RETURN_AMOUNT_BY_RANK[r];
      return sum + returnAmount;
    }, 0);
  },

  calculateReturnRate(returnAmount, purchaseAmount) {
    return (returnAmount / purchaseAmount) * 100;
  },
};

export default LottoReturnCalculator;

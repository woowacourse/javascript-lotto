export const calculator = {
  getQuotient(divisor, dividend) {
    return divisor / dividend;
  },

  getProfits(prizeMoney, cost) {
    const profits = (prizeMoney / cost) * 100;
    return profits.toFixed(1);
  },
};

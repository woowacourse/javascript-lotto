import { WINNING, KEYS } from "./constant/lotto.js";

const Calculator = {
  totalPrize(winningRanks) {
    const total = Object.values(KEYS).reduce((total, key) => {
      return total + WINNING[key].PRIZES * winningRanks[key];
    }, 0);

    return total;
  },

  yieldRate(amount, totalPrize) {
    return ((totalPrize / amount) * 100).toFixed(1);
  },
};

export default Calculator;

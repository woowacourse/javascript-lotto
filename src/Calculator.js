import PRICE from "./constant/price.js";
import { WINNING, KEYS } from "./constant/lotto.js";

const Calculator = {
  getTotalPrize(winningCounts) {
    const total = Object.values(KEYS).reduce((total, key) => {
      return total + WINNING[key].PRIZES * winningCounts[key];
    }, 0);

    return total;
  },

  getYieldRate(amount, totalPrize) {
    return (totalPrize / amount) * 100;
  },

  getQuantity(amount) {
    return amount / PRICE.UNIT;
  },
};

export default Calculator;

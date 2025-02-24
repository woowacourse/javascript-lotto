import { WINNING, KEYS } from "./constant/lotto.js";
import { DECIMAL_PLACE } from "./constant/number.js";

const Calculator = {
  getTotalPrize(winningRanks) {
    const total = Object.values(KEYS).reduce((total, key) => {
      return total + WINNING[key].PRIZES * winningRanks[key];
    }, 0);

    return total;
  },

  getYieldRate(amount, totalPrize) {
    return ((totalPrize / amount) * 100).toFixed(DECIMAL_PLACE);
  },
};

export default Calculator;

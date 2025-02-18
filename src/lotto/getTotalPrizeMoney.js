import { LOTTO_PRIZE_MONEY } from "../constants/lotto.js";

export const getTotalPrizeMoney = (result) => {
  return Array.from(result.entries()).reduce((acc, [matchKey, count]) => {
    return acc + count * LOTTO_PRIZE_MONEY.get(matchKey);
  }, 0);
};

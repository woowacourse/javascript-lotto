import { LOTTO_PRIZE_MONEY } from "../constants/lotto.js";

const getTotalPrizeMoney = (result) => {
  return Array.from(result).reduce((acc, [matchKey, count]) => {
    return acc + count * LOTTO_PRIZE_MONEY.get(matchKey);
  }, 0);
};

export default getTotalPrizeMoney;

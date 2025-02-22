import { LOTTO_MATCHED_NUMBER_COUNT, LOTTO_PRIZE_MONEY } from "../constants/lotto.js";

const getTotalPrizeMoney = (result) => {
  return Array.from(result).reduce((acc, [matchKey, count]) => {
    const matchedCount = LOTTO_MATCHED_NUMBER_COUNT.get(matchKey)
    return acc + count * LOTTO_PRIZE_MONEY.get(matchedCount);
  }, 0);
};

export default getTotalPrizeMoney;

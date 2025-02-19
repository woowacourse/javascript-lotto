import { LOTTO_PRIZE_MONEY } from "../constants/lotto.js";
import { getIntersection } from "../utils/array.js";

const calculatePrizeResult = (lottoNumbers, winningNumbers, bonusNumber) => {
  const initResult = Array.from(LOTTO_PRIZE_MONEY).map(([key]) => [key, 0]);
  const result = new Map(initResult);

  lottoNumbers.forEach((numbers) => {
    const count = getIntersection(numbers, winningNumbers).length;

    if (!LOTTO_PRIZE_MONEY.has(count)) {
      return;
    }

    if (count === 5 && numbers.includes(bonusNumber)) {
      const prevCount = result.get("5B") ?? 0;
      result.set("5B", prevCount + 1);
      return;
    }

    const prevCount = result.get(count) ?? 0;
    result.set(count, prevCount + 1);
  });

  return result;
};

export default calculatePrizeResult;

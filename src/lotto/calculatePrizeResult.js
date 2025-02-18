import { LOTTO_PRIZE_MONEY } from "../constants/lotto.js";
import { findMatchingValues } from "../utils/array.js";

export const calculatePrizeResult = (
  lottoNumbers,
  winningNumbers,
  bonusNumber
) => {
  const result = new Map(
    Array.from(LOTTO_PRIZE_MONEY.keys()).map((key) => [key, 0])
  );

  lottoNumbers.forEach((numbers) => {
    const count = findMatchingValues(numbers, winningNumbers).length;

    if (count === 5 && numbers.includes(bonusNumber)) {
      result.set("5B", result.get("5B") + 1 || 1);
      return;
    }

    result.set(count, result.get(count) + 1 || 1);
  });

  return result;
};

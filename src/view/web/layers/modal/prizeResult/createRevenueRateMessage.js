import { PRIZE_RESULT } from "../../../../../constants/web.js";
import { roundNumber } from "../../../../../utils/domain/math.js";

const createRevenueRateMessage = (revenueRate) => {
  const formattedRevenueRate = roundNumber(
    revenueRate,
    PRIZE_RESULT.REVENUE_RATE_DIGITS,
  );

  return `당신의 총 수익률은 ${formattedRevenueRate}% 입니다.`;
};

export default createRevenueRateMessage;

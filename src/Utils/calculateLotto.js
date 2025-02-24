import {
  LOTTO_DEFINITION,
  LOTTO_PRIZE_MONEY_DEFINITION,
} from '../Domain/Constant/definition.js';

export const calculateLottoTickets = (money) => {
  return money / LOTTO_DEFINITION.ONE_PRICE;
};

export const calculateLottoPrize = (result) => {
  return Object.entries(result).reduce(
    (acc, [key, count]) => acc + LOTTO_PRIZE_MONEY_DEFINITION[key] * count,
    0
  );
};

export const calculateLottoProfit = (totalLottoPrize, purchaseAmount) => {
  return (totalLottoPrize / purchaseAmount) * 100;
};

import { PRICE_ERROR } from '../constants/constants.js';

export const calculateWinningRate = (price, prize) => {
  if (price <= 0) {
    throw new Error(PRICE_ERROR);
  }

  const rate = (prize / price) * 100;

  if (rate % 1 === 0) return Number(rate.toString());
  return Number(rate.toFixed(2));
};

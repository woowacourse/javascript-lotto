import { DECIMAL_PLACE, PRIZE } from "../constants";

export const getTotalPrize = (placesOfLottoTickets) => {
  return placesOfLottoTickets.map((place) => PRIZE[place]).reduce((acc, cur) => acc + cur, 0);
};

export const getRateOfReturn = (totalPrize, purchaseAmount) => {
  return Number(((totalPrize / purchaseAmount) * 100).toFixed(DECIMAL_PLACE));
};

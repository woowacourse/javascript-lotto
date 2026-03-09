import { RANK } from "../constants/lottoInfo.js";

export function calPrize(count, hasBonus) {
  if (count === 6) return RANK.FIRST;
  else if (count === 5 && hasBonus) return RANK.SECOND;
  else if (count === 5) return RANK.THIRD;
  else if (count === 4) return RANK.FOURTH;
  else if (count === 3) return RANK.FIFTH;
  return RANK.NONE;
}

export function calProfitRate(price, totalPrize) {
  return (totalPrize / price) * 100;
}

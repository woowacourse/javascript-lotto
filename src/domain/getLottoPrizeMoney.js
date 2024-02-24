import { AMOUNT } from "../constants/lottoConstants.js";

const getLottoPrizeMoney = (results) => {
  return Object.keys(results).reduce((totalPrize, rank) => {
    return totalPrize + AMOUNT[rank] * results[rank];
  }, 0);
};

export default getLottoPrizeMoney;

import { REWARD_TABLE } from "../constants/lottoConstants.js";

const getLottoPrizeMoney = (results) => {
  return Object.keys(results).reduce((totalPrize, rank) => {
    return totalPrize + REWARD_TABLE[rank] * results[rank];
  }, 0);
};

export default getLottoPrizeMoney;

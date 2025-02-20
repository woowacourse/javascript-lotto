import { PRIZE } from "../constants/prize.js";

const checkRank = (matchCount, isBonusMatched) => {
  switch (matchCount) {
    case 6:
      return PRIZE.FIRST;
    case 5:
      return isBonusMatched ? PRIZE.SECOND : PRIZE.THIRD;
    case 4:
      return PRIZE.FOURTH;
    case 3:
      return PRIZE.FIFTH;
    default:
      return;
  }
};

export default checkRank;

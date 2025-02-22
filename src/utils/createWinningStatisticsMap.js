import { MATCH_KEY, MATCH_PRIZE } from "../constants/constants.js";

const createWinningStatisticsMap = (counts = {}) => {
  return new Map([
    [
      MATCH_KEY.THREE,
      {
        count: counts[MATCH_KEY.THREE] ?? 0,
        amount: MATCH_PRIZE[MATCH_KEY.THREE],
      },
    ],
    [
      MATCH_KEY.FOUR,
      {
        count: counts[MATCH_KEY.FOUR] ?? 0,
        amount: MATCH_PRIZE[MATCH_KEY.FOUR],
      },
    ],
    [
      MATCH_KEY.FIVE,
      {
        count: counts[MATCH_KEY.FIVE] ?? 0,
        amount: MATCH_PRIZE[MATCH_KEY.FIVE],
      },
    ],
    [
      MATCH_KEY.FIVE_AND_BONUS,
      {
        count: counts[MATCH_KEY.FIVE_AND_BONUS] ?? 0,
        amount: MATCH_PRIZE[MATCH_KEY.FIVE_AND_BONUS],
      },
    ],
    [
      MATCH_KEY.SIX,
      {
        count: counts[MATCH_KEY.SIX] ?? 0,
        amount: MATCH_PRIZE[MATCH_KEY.SIX],
      },
    ],
  ]);
};

export default createWinningStatisticsMap;

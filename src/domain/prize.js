import { NO_MATCH_PLACE, PRIZE } from '../constants/prize-constants.js';

const prize = {
  findMatchCountByRank: (rank) => PRIZE[rank].matchCount,

  findIsBonusByRank: (rank) => PRIZE[rank].isBonus,

  findRewardByRank: (rank) => PRIZE[rank].reward,

  findRankByMatchCountAndBonus: ({ numberMatchCount, isBonus }) => {
    const entry = Object.entries(PRIZE).find(
      ([_, value]) => value.matchCount === numberMatchCount && value.isBonus === isBonus,
    );

    return entry ? entry[0] : NO_MATCH_PLACE;
  },

  generateInitiallResultObject: () => {
    const initialResult = Object.keys(PRIZE).reduce((acc, key) => {
      acc[key] = 0;
      return acc;
    }, {});

    initialResult[NO_MATCH_PLACE] = 0;

    return initialResult;
  },

  getTotalRewardByTotalResult: (totalResult) => {
    return Object.keys(totalResult).reduce((acc, cur) => {
      const prizeReward = PRIZE[cur] ? PRIZE[cur].reward * totalResult[cur] : 0;
      return acc + prizeReward;
    }, 0);
  },
};

export default prize;

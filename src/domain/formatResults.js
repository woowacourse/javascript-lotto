import { PRIZE } from "../constants/prize.js";

const formatResults = (resultCount) => {
  return Object.entries(PRIZE).map(
    ([key, { WINNING_CRITERIA, REWARD }], index) => ({
      rank: key, // "FIFTH", "FOURTH"...
      winningCriteria: WINNING_CRITERIA, // 당첨 조건으로 필요한 숫자 개수
      reward: REWARD, // 당첨 금액
      count: resultCount[index + 1] || 0, // 당첨된 개수 (없으면 0)
    })
  );
};

export default formatResults;

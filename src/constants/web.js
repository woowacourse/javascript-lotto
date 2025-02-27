import FrozenMap from "../FrozenMap.js";
import { LOTTO_MATCHED_NUMBER_COUNT } from "./lotto.js";

export const PRIZE_RESULT = {
  HEADERS: ["일치갯수", "당첨금", "당첨갯수"],
  LOTTO_UNIT: "개",
  REVENUE_RATE_DIGITS: 2,
};

export const LOTTO_RESULT_TABLE_MAP = Array.from(
  LOTTO_MATCHED_NUMBER_COUNT,
).reduce((matchedTemplate, [matchedCount, matchKey]) => {
  if (matchKey === "5개 일치+보너스") {
    matchedTemplate.set(matchedCount, "5개+보너스볼");
    return matchedTemplate;
  }

  matchedTemplate.set(matchedCount, `${matchedCount}개`);
  return matchedTemplate;
}, new FrozenMap());

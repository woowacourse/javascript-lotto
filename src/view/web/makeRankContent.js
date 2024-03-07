import { PRIZE } from "../../domain/calculateTotalPrize.js";

function makeRankContent(rank, i) {
  if (i < PRIZE.length - 2) return [`${i + 3}개`, PRIZE[i], `${rank}개`];
  if (i === PRIZE.length - 2) return [`${i + 2}개 + 보너스볼`, PRIZE[i], `${rank}개`];

  return [`${i + 2}개`, PRIZE[i], `${rank}개`];
}

export default makeRankContent;

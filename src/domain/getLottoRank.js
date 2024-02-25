import { LOTTO } from "../constants/lotto.js";
import getMatchCount from "../utils/getMatchCount.js";
import isIncludingValue from "../utils/isIncludingValue.js";
import { PRIZE } from "./calculateTotalPrize.js";

const START_MATCH_COUNT = 3;

function getRankIndex(matchCount, isBonus) {
  if (matchCount === LOTTO.count) return PRIZE.length - 1;
  if (matchCount === LOTTO.count - 1 && isBonus) return PRIZE.length - 2;
  return matchCount - 3;
}

function calcMatchCountAndBonus({
  winningLotto,
  bonusLottoNumber,
  randomLotto,
}) {
  const matchCount = getMatchCount(randomLotto.get(), winningLotto);
  const isBonus = isIncludingValue(randomLotto.get(), bonusLottoNumber);

  return { matchCount, isBonus };
}

function getLottoRank({ winningLotto, bonusLottoNumber, randomLottos }) {
  const ranks = new Array(PRIZE.length).fill(0);

  randomLottos.forEach((randomLotto) => {
    const { matchCount, isBonus } = calcMatchCountAndBonus({
      winningLotto,
      bonusLottoNumber,
      randomLotto,
    });

    if (matchCount < START_MATCH_COUNT) return;

    const rankIndex = getRankIndex(matchCount, isBonus);
    if (rankIndex >= 0) ranks[rankIndex] += 1;
  });

  return ranks;
}

export default getLottoRank;

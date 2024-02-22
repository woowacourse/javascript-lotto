import { getMatchCount } from "../utils/getMatchCount.js";
import { isIncludingValue } from "../utils/isIncludingValue.js";
import Lotto from "./Lotto.js";

const prize = [1, 2, 3, 4, 5];
const START_MATCH_COUNT = 3;

function getRankIndex(matchCount, isBonus) {
  if (matchCount === Lotto.NUMBER_COUNT) return prize.length - 1;
  if (matchCount === Lotto.NUMBER_COUNT - 1 && isBonus) return prize.length - 2;
  return matchCount - 3;
}

// TODO: 리팩토링 해야한다.
function getLottoRank({ winningLotto, bonusLottoNumber, randomLottos }) {
  const ranks = Array.from({ length: 5 }, () => 0);

  randomLottos.forEach((randomLotto) => {
    const matchCount = getMatchCount(randomLotto.get(), winningLotto.get());
    const isBonus = isIncludingValue(randomLotto.get(), bonusLottoNumber.get());

    if (matchCount < START_MATCH_COUNT) return;

    const rankIndex = getRankIndex(matchCount, isBonus);

    ranks[rankIndex] += 1;
  });

  return ranks;
}

export default getLottoRank;

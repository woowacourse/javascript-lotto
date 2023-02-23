import { LOTTO } from "../constants";

export const judgeResult = (lottos, winningNumber) => {
  console.log(lottos, winningNumber);
  const rankingCount = Array(LOTTO.prize.length).fill(0);

  return lottos.reduce((acc, lotto) => {
    const ranking = lotto.calculateRanking(winningNumber);
    acc[ranking - 1] += 1;
    return acc;
  }, rankingCount);
};

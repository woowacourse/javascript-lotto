export function getCompareResult(userLottos, winningLotto) {
  const rankResult = {
    FIRST: 0,
    SECOND: 0,
    THIRD: 0,
    FOURTH: 0,
    FIFTH: 0,
  };

  userLottos.forEach((userLotto) => {
    const rank = winningLotto.getRank(userLotto);
    if (rank) rankResult[rank]++;
  });

  return rankResult;
}

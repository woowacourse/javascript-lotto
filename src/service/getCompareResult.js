export function getCompareResult(userLottos, winningLotto) {
  const count = {
    FIRST: 0,
    SECOND: 0,
    THIRD: 0,
    FOURTH: 0,
    FIFTH: 0,
  };

  userLottos.forEach((userLotto) => {
    const rank = winningLotto.getRank(userLotto);
    if (rank) count[rank]++;
  });

  return count;
}

export const getPrizeList = (purchasedLottos, winningLotto) => {
  const prizeList = [0, 0, 0, 0, 0, 0];
  purchasedLottos.forEach((lotto) => {
    const rank = winningLotto.getRank(lotto);
    if (rank !== null) prizeList[rank]++;
  });
  return prizeList;
};

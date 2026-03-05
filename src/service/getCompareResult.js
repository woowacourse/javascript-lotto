export function getCompareResult(userLottos, winningLotto) {
  const count = {
    FIRST: 0,
    SECOND: 0,
    THIRD: 0,
    FOURTH: 0,
    FIFTH: 0,
  };

  for (let i = 0; i < userLottos.length; i++) {
    const rank = checkWinningNumber(userLottos[i], winningLotto);
    count[rank]++;
  }

  return count;
}

function checkWinningNumber(userLotto, winningLotto) {
  const filterArray = userLotto
    .getNumber()
    .filter((item) => winningLotto.getWinningNumber().includes(item));

  if (filterArray.length === 6) return "FIRST";
  if (
    filterArray.length === 5 &&
    compareBonusNumber(userLotto.getNumber(), winningLotto.getBonusNumber())
  )
    return "SECOND";

  if (
    filterArray.length === 5 &&
    !compareBonusNumber(userLotto.getNumber(), winningLotto.getBonusNumber())
  )
    return "THIRD";
  if (filterArray.length === 4) return "FOURTH";
  if (filterArray.length === 3) return "FIFTH";
}

function compareBonusNumber(userLotto, bonusNumber) {
  return userLotto.includes(Number(bonusNumber));
}

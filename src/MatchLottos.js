export function matchWinningCount(lotto, winningLotto) {
  return lotto.filter((number) => winningLotto.includes(number)).length;
}

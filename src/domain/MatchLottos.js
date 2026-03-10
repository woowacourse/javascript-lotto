export function matchWinningCount(lotto, winningLotto) {
  return lotto.filter((number) => winningLotto.includes(number)).length;
}

export function matchBonus(lotto, bonusNum) {
  return lotto.includes(bonusNum);
}

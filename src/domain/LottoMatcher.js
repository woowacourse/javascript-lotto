import { SETTINGS } from "../constants/index.js";

export const countMatches = (numbers, winningNumbers) => {
  return numbers.filter((number) => winningNumbers.includes(number)).length;
};

export const hasBonusMatch = (numbers, bonusNumber) => {
  return numbers.includes(bonusNumber);
};

export const calculateRank = (numbers, winningNumber) => {
  const matchCount = countMatches(numbers, winningNumber.winning);

  if (matchCount === SETTINGS.rewards.first.matchCount) return "first";
  if (matchCount === SETTINGS.rewards.second.matchCount && hasBonusMatch(numbers, winningNumber.bonus))
    return "second";
  if (matchCount === SETTINGS.rewards.third.matchCount) return "third";
  if (matchCount === SETTINGS.rewards.fourth.matchCount) return "fourth";
  if (matchCount === SETTINGS.rewards.fifth.matchCount) return "fifth";

  return "none";
};

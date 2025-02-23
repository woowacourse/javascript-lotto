import { SETTINGS } from "../constants/index.js";

export const countMatches = (numbers, winningNumbers) => {
  return numbers.filter((number) => winningNumbers.includes(number)).length;
};

export const hasBonusMatch = (numbers, bonusNumber) => {
  return numbers.includes(bonusNumber);
};

export const calculateRank = (numbers, winningNumbers, bonusNumber) => {
  const matchCount = countMatches(numbers, winningNumbers);

  if (matchCount === SETTINGS.rewards.first.matchCount) return "first";
  if (matchCount === SETTINGS.rewards.second.matchCount && hasBonusMatch(numbers, bonusNumber))
    return "second";
  if (matchCount === SETTINGS.rewards.third.matchCount) return "third";
  if (matchCount === SETTINGS.rewards.fourth.matchCount) return "fourth";
  if (matchCount === SETTINGS.rewards.fifth.matchCount) return "fifth";

  return "none";
};

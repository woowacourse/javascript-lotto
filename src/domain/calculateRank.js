export const calculateRank = (matchCount, isBonusMatch) => {
  if (matchCount === 6) return 1;
  if (matchCount === 5 && isBonusMatch) return 2;
  if (matchCount === 5) return 3;
  if (matchCount === 4) return 4;
  if (matchCount === 3) return 5;
};

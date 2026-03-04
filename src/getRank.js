export default function getRank(lottoNumbers, winningNumbers, bonus) {
  const matchingCount = lottoNumbers.filter((x) =>
    winningNumbers.includes(x)
  ).length;

  const isBonus = lottoNumbers.includes(bonus);

  if (matchingCount === 6) return 1;
  else if (matchingCount === 5 && isBonus) return 2;
  else if (matchingCount === 5 && !isBonus) return 3;
  else if (matchingCount === 4) return 4;
  else if (matchingCount === 3) return 5;
  else return null;
}

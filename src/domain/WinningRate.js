export function calRank(count, hasBonus) {
  if (count === 6) return 1;
  else if (count === 5 && hasBonus) return 2;
  else if (count === 5) return 3;
  else if (count === 4) return 4;
  else if (count === 3) return 5;
  return 0;
}

export function calProfitRate(price, totalPrize) {
  return (totalPrize / price) * 100;
}

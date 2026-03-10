import { LOTTO_RANK } from "../constants/config.js";

export function resultCalculator(results) {
  const resultData = Object.values(LOTTO_RANK)
    .map((rank) => ({ ...rank, count: 0 }))
    .sort((a, b) => a.matchCount - b.matchCount || Number(a.requireBonus) - Number(b.requireBonus));

  results.forEach(({ matchCount, hasBonus }) => {
    const rank = resultData.find((r) => r.matchCount === matchCount && r.requireBonus === hasBonus);
    if (rank) rank.count++;
  });

  return resultData;
}

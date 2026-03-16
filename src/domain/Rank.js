export default class Rank {
  static CONFIG = Object.freeze({
    FIRST: {
      matchCount: 6,
      hasBonus: false,
      prize: 2_000_000_000,
      order: 1,
    },
    SECOND: {
      matchCount: 5,
      hasBonus: true,
      prize: 30_000_000,
      order: 2,
    },
    THIRD: {
      matchCount: 5,
      hasBonus: false,
      prize: 1_500_000,
      order: 3,
    },
    FOURTH: {
      matchCount: 4,
      hasBonus: false,
      prize: 50_000,
      order: 4,
    },
    FIFTH: {
      matchCount: 3,
      hasBonus: false,
      prize: 5_000,
      order: 5,
    },
  });

  static findRank(winningMatch, bonusMatch) {
    const found = Object.values(Rank.CONFIG).find(
      ({ matchCount, hasBonus }) => {
        if (matchCount !== winningMatch) return false;
        if (matchCount === 5) return hasBonus === bonusMatch;
        return true;
      },
    );
    return found ?? null;
  }

  static getRankMap() {
    return new Map(
      Object.values(Rank.CONFIG).map((rank) => [
        rank.order,
        { ...rank, count: 0 },
      ]),
    );
  }
}

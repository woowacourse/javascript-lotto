export default class Rank {
  static CONFIG = Object.freeze({
    FIRST: {
      winningCondition: 6,
      bonusCondition: false,
      prize: 2_000_000_000,
      order: 1,
    },
    SECOND: {
      winningCondition: 5,
      bonusCondition: true,
      prize: 30_000_000,
      order: 2,
    },
    THIRD: {
      winningCondition: 5,
      bonusCondition: false,
      prize: 1_500_000,
      order: 3,
    },
    FOURTH: {
      winningCondition: 4,
      bonusCondition: false,
      prize: 50_000,
      order: 4,
    },
    FIFTH: {
      winningCondition: 3,
      bonusCondition: false,
      prize: 5_000,
      order: 5,
    },
    MISS: { winningCondition: 0, bonusCondition: false, prize: 0, order: 6 },
  });

  static findRank(winningMatch, bonusMatch) {
    const found = Object.values(Rank.CONFIG).find(
      ({ winningCondition, bonusCondition }) => {
        if (winningCondition !== winningMatch) return false;
        if (winningCondition === 5) return bonusCondition === bonusMatch;
        return true;
      },
    );
    return found || Rank.CONFIG.MISS;
  }

  static getRankMap() {
    return new Map(
      Object.values(Rank.CONFIG).map((rank) => [rank, { count: 0 }]),
    );
  }
}

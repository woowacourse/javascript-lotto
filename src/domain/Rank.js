class Rank {
  static PRIZE = {
    FIRST: 2_000_000_000,
    SECOND: 30_000_000,
    THIRD: 1_500_000,
    FOURTH: 50_000,
    FIFTH: 5_000,
    MISS: 0,
  };

  static FIRST = new Rank({ matchCount: 6, hasBonus: false });
  static SECOND = new Rank({ matchCount: 5, hasBonus: true });
  static THIRD = new Rank({ matchCount: 5, hasBonus: false });
  static FOURTH = new Rank({ matchCount: 4, hasBonus: false });
  static FIFTH = new Rank({ matchCount: 3, hasBonus: false });

  static order = [Rank.FIFTH, Rank.FOURTH, Rank.THIRD, Rank.SECOND, Rank.FIRST];

  constructor({ matchCount, hasBonus }) {
    this.matchCount = matchCount;
    this.hasBonus = hasBonus;
  }

  getPrize() {
    if (this === Rank.FIRST) return Rank.PRIZE.FIRST;
    if (this === Rank.SECOND) return Rank.PRIZE.SECOND;
    if (this === Rank.THIRD) return Rank.PRIZE.THIRD;
    if (this === Rank.FOURTH) return Rank.PRIZE.FOURTH;
    if (this === Rank.FIFTH) return Rank.PRIZE.FIFTH;
    return Rank.PRIZE.MISS;
  }

  static getRank({ matchCount, hasBonus }) {
    if (matchCount === 6) return Rank.FIRST;
    if (matchCount === 5 && hasBonus) return Rank.SECOND;
    if (matchCount === 5) return Rank.THIRD;
    if (matchCount === 4) return Rank.FOURTH;
    if (matchCount === 3) return Rank.FIFTH;
    return Rank.MISS;
  }

  getResult() {
    return { matchCount: this.matchCount, hasBonus: this.hasBonus };
  }
}

export default Rank;

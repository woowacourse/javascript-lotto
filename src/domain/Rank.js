class Rank {
  static LOTTO_PRIZE = {
    FIRST: 2_000_000_000,
    SECOND: 30_000_000,
    THIRD: 1_500_000,
    FOURTH: 50_000,
    FIFTH: 5_000,
    MISS: 0,
  };

  static FIRST = new Rank(6, false);
  static SECOND = new Rank(5, true);
  static THIRD = new Rank(5, false);
  static FOURTH = new Rank(4, false);
  static FIFTH = new Rank(3, false);
  static MISS = new Rank(0, false);

  static order = [Rank.FIRST, Rank.SECOND, Rank.THIRD, Rank.FOURTH, Rank.FIFTH];

  constructor({ winning, hasBonus }) {
    this.winning = winning;
    this.hasBonus = hasBonus;
  }

  getPrize() {
    if (this === Rank.FIRST) return PRIZE.FIRST;
    if (this === Rank.SECOND) return PRIZE.SECOND;
    if (this === Rank.THIRD) return PRIZE.THIRD;
    if (this === Rank.FOURTH) return PRIZE.FOURTH;
    if (this === Rank.FIFTH) return PRIZE.FIFTH;
    return PRIZE.MISS;
  }

  static getRank({ winning, hasBonus }) {
    if (winning === 6) return Rank.FIRST;
    if (winning === 5 && hasBonus) return Rank.SECOND;
    if (winning === 5) return Rank.THIRD;
    if (winning === 4) return Rank.FOURTH;
    if (winning === 3) return Rank.FIFTH;
    return Rank.MISS;
  }
}

export default Rank;

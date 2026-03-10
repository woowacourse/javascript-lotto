class Rank {
  static FIRST = new Rank({ matchCount: 6, hasBonus: false, prize: 2_000_000_000 });
  static SECOND = new Rank({ matchCount: 5, hasBonus: true, prize: 30_000_000 });
  static THIRD = new Rank({ matchCount: 5, hasBonus: false, prize: 1_500_000 });
  static FOURTH = new Rank({ matchCount: 4, hasBonus: false, prize: 50_000 });
  static FIFTH = new Rank({ matchCount: 3, hasBonus: false, prize: 5_000 });
  static MISS = new Rank({ matchCount: 0, hasBonus: false, prize: 0 });

  static order = [Rank.FIFTH, Rank.FOURTH, Rank.THIRD, Rank.SECOND, Rank.FIRST];

  #matchCount;
  #hasBonus;
  #prize;

  constructor({ matchCount, hasBonus, prize }) {
    this.#matchCount = matchCount;
    this.#hasBonus = hasBonus;
    this.#prize = prize;
  }

  getPrize() {
    return this.#prize;
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
    return { matchCount: this.#matchCount, hasBonus: this.#hasBonus };
  }
}

export default Rank;

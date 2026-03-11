export default class Rank {
  static FIRST = new Rank(6, false);
  static SECOND = new Rank(5, true);
  static THIRD = new Rank(5, false);
  static FOURTH = new Rank(4, false);
  static FIFTH = new Rank(3, false);
  static MISS = new Rank(0, false);

  static #RULE_MAP = new Map([
    [Rank.FIRST, { prize: 2_000_000_000, order: 1 }],
    [Rank.SECOND, { prize: 30_000_000, order: 2 }],
    [Rank.THIRD, { prize: 1_500_000, order: 3 }],
    [Rank.FOURTH, { prize: 50_000, order: 4 }],
    [Rank.FIFTH, { prize: 5_000, order: 5 }],
    [Rank.MISS, { prize: 0, order: 6 }],
  ]);

  #winningCondition;
  #bonusCondition;

  constructor(winningCondition, bonusCondition) {
    this.#winningCondition = winningCondition;
    this.#bonusCondition = bonusCondition;
  }

  static findRank(winningMatch, bonusMatch) {
    const foundRank = [...Rank.#RULE_MAP.keys()].find((rank) => {
      const { winningCondition, bonusCondition } = rank.getCondition();
      return winningCondition === winningMatch && bonusCondition === bonusMatch;
    });
    return foundRank || Rank.MISS;
  }

  getPrize() {
    return Rank.#RULE_MAP.get(this);
  }

  getCondition() {
    const winningCondition = this.#winningCondition;
    const bonusCondition = this.#bonusCondition;
    return { winningCondition, bonusCondition };
  }
}

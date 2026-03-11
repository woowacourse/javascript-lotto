export default class Rank {
  static PRIZES = Object.freeze({
    FIRST: 2_000_000_000,
    SECOND: 30_000_000,
    THIRD: 1_500_000,
    FOURTH: 50_000,
    FIFTH: 5_000,
    MISS: 0,
  });

  static FIRST = new Rank(6, false);
  static SECOND = new Rank(5, true);
  static THIRD = new Rank(5, false);
  static FOURTH = new Rank(4, false);
  static FIFTH = new Rank(3, false);
  static MISS = new Rank(0, false);

  static #RANK_LIST = [
    Rank.FIRST,
    Rank.SECOND,
    Rank.THIRD,
    Rank.FOURTH,
    Rank.FIFTH,
    Rank.MISS,
  ];

  #winningCondition;
  #bonusCondition;

  constructor(winningCondition, bonusCondition) {
    this.#winningCondition = winningCondition;
    this.#bonusCondition = bonusCondition;
  }

  static findRank(winningMatch, bonusMatch) {
    const foundRank = Rank.#RANK_LIST.find((rank) => {
      const { winningCondition, bonusCondition } = rank.getCondition();

      return winningCondition === winningMatch && bonusCondition === bonusMatch;
    });
    return foundRank || Rank.MISS;
  }

  getPrize() {
    return Rank.PRIZES[Object.keys(Rank).find((key) => Rank[key] === this)];
  }

  getCondition() {
    const winningCondition = this.#winningCondition;
    const bonusCondition = this.#bonusCondition;
    return { winningCondition, bonusCondition };
  }
}

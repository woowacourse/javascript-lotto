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

  #winningMatchCondition;
  #bonusMatchCondition;

  constructor(winningMatchCondition, bonusMatchCondition) {
    this.#winningMatchCondition = winningMatchCondition;
    this.#bonusMatchCondition = bonusMatchCondition;
  }

  findRank(winningMatch, bonusMatch) {}
  getPrize() {}
  getCondition() {}
}

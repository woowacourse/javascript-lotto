class LottoRank {
  #rank;

  constructor() {
    this.#rank = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
  }

  addRankingCount(ranking) {
    this.#rank[ranking] += 1;
  }

  get rank() {
    return this.#rank;
  }
}

export default LottoRank;

class LottoService {
  #rankList;

  constructor() {
    this.#rankList = [...Array(6)].fill(0);
  }

  pickLottoRank(matchedResult) {
    if (matchedResult.matchedCount === 3) {
      this.#rankList[5] += 1;
    } else if (matchedResult.matchedCount === 4) {
      this.#rankList[4] += 1;
    } else if (matchedResult.matchedCount === 5 && matchedResult.isBonusMatched) {
      this.#rankList[2] += 1;
    } else if (matchedResult.matchedCount === 5) {
      this.#rankList[3] += 1;
    } else if (matchedResult.matchedCount === 6) {
      this.#rankList[1] += 1;
    }
  }

  get rankList() {
    return this.#rankList;
  }
}

export default LottoService;

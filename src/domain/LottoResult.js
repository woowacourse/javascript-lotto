class LottoResult {
  #lottoList;
  #WinningLotto;

  constructor(lottoList, WinningLotto) {
    this.#lottoList = lottoList;
    this.#WinningLotto = WinningLotto;
  }

  #getResult() {
    const arr = [];
    this.#lottoList.forEach((lotto) => {
      const rank = lotto.getRank(this.#WinningLotto);
      if (rank !== 6) arr.push(rank);
    });

    return arr;
  }

  getTotalResult() {
    const results = this.#getResult();
    return results.reduce(
      (acc, cur) => {
        acc[cur] += 1;
        return acc;
      },
      { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    );
  }
}
export default LottoResult;

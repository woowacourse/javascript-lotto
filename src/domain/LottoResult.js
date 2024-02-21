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
      arr.push(rank);
    });

    return arr;
  }

  //  {
  //     1,2,3,1,2,0
  //  }

  // [
  //   { reward: 2000000000, matchCount: 6, bonus: false },
  //   { reward: 30000000, matchCount: 5, bonus: true }

  // ]

  getTotalResult() {
    const results = this.#getResult();
    return results.reduce(
      (acc, cur) => {
        acc[cur] += 1;
        return acc;
      },
      { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
    );
  }
}
export default LottoResult;

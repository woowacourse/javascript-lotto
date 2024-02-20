class LottoResult {
  #lottoList;
  #WinningLotto;

  constructor(lottoList, WinningLotto) {
    this.#lottoList = lottoList;
    this.#WinningLotto = WinningLotto;
  }

  getResult() {
    this.#lottoList.forEach((lotto) => {
      const rank = lotto.getRank(this.#WinningLotto);
      console.log(rank);
    });
  }
}
export default LottoResult;

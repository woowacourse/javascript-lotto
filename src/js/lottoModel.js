export default class LottoModel {
  #lottoList;

  constructor() {
    this.#lottoList = [];
  }

  getLottoList() {
    return this.#lottoList;
  }

  setLottoList(lottoCount) {
    this.#lottoList = Array.from({ length: lottoCount }).map(() =>
      this.#generateLotto()
    );
  }

  #generateLotto() {
    const lottoNum = new Set();

    while (lottoNum.size < 6) {
      lottoNum.add(this.#generateRandomNum());
    }

    return lottoNum;
  }

  #generateRandomNum() {
    return Math.floor(Math.random() * (45 - 2)) + 1;
  }
}

export default class Lotto {
  #lottoNumberList;

  constructor() {
    this.#lottoNumberList = [];
  }

  setLotto(lottoNumbers) {
    this.#lottoNumberList = lottoNumbers;
  }

  getLotto() {
    return this.#lottoNumberList;
  }
}

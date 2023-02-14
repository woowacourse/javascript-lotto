class Lotto {
  #lottoNum = [];

  constructor(lottoNum) {
    this.#lottoNum = lottoNum;
  }

  get lottoNum() {
    return this.#lottoNum;
  }
}

export default Lotto;

export default class Lotto {
  constructor() {
    this.lottoNumberList = [];
  }

  setLotto(lottoNumbers) {
    this.lottoNumberList = lottoNumbers;
  }

  getLotto() {
    return this.lottoNumberList;
  }
}

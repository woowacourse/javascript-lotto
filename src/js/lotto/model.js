class LottoModel {
  constructor() {
    this._lottos = [];
    this._detail = false;
  }

  get lottos() {
    return this._lottos;
  }

  get detail() {
    return this._detail;
  }

  get amount() {
    return this._lottos.length;
  }

  addLotto(newLotto) {
    this._lottos.push(newLotto);
  }

  toggleDetail() {
    this._detail = !this._detail;
  }

  init() {
    this._lottos = [];
    this._detail = false;
  }
}
export default LottoModel;

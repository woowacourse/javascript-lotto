class LottoModel {
  constructor() {
    this._lottos = [];
    this._detail = false;
  }

  get lottos() {
    return this._lottos;
  }

  set lottos(newLottos) {
    this._lottos = newLottos;
  }

  set addLotto(newLotto) {
    this._lottos.push(newLotto);
  }

  get detail() {
    return this._detail;
  }

  toggleDetail() {
    this._detail = !this._detail;
  }
}

export default LottoModel;

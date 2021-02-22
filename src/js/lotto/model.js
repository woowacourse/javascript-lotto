class LottoModel {
  constructor() {
    this._lottos = []
  }

  get lottos() {
    return this._lottos
  }

  get amount() {
    return this._lottos.length
  }

  addLotto(newLotto) {
    this._lottos.push(newLotto)
  }

  init() {
    this._lottos = []
  }
}
export default LottoModel

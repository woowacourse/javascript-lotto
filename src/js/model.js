import { INIT } from "./constant.js"

class LottoModel {
  constructor() {
    this._lottos = INIT.LOTTOS
    this._detail = INIT.DETAIL
  }

  get lottos() {
    return this._lottos
  }

  set lottos(newLottos) {
    this._lottos = newLottos
  }

  addLotto(newLotto) {
    this._lottos.push(newLotto)
  }

  get detail() {
    return this._detail
  }

  toggleDetail() {
    this._detail = !this._detail
  }

  get amount() {
    return this._lottos.length
  }

  init() {
    this._lottos = INIT.LOTTOS
    this._detail = INIT.DETAIL
  }
}
export default LottoModel

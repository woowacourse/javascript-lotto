import { INIT } from "../constants/constant.js";

class LottoModel {
  constructor() {
    this._lottos = [...INIT.LOTTOS];
    this._detail = INIT.DETAIL;
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
    this._lottos = [...INIT.LOTTOS];
    this._detail = INIT.DETAIL;
  }
}
export default LottoModel;

import { makeLottoNumbers } from './utils/common.js';
export default class Model {
  #lottoList = [];

  getLottoList() {
    return this.#lottoList;
  }

  buyLotto(quantity) {
    this.#lottoList = [];
    for (let i = 0; i < quantity; i++) {
      this.#lottoList.push(makeLottoNumbers());
    }
  }
}

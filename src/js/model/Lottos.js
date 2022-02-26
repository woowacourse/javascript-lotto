import Lotto from './Lotto.js';

export default class Lottos {
  #lottos = [];

  constructor() {
    this.#init();
  }

  #init() {
    this.#lottos = [];
  }

  #setLottos(lottos) {
    this.#lottos = lottos;
  }

  getLottos() {
    return this.#lottos;
  }

  makeNewLottos(count) {
    const newLottos = [...Array(count)].map(() => new Lotto());
    this.#setLottos(newLottos);
    return this.getLottos();
  }

  reset() {
    this.#setLottos([]);
  }
}

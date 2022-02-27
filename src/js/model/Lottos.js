import Lotto from './Lotto.js';

export default class Lottos {
  #lottos = null;

  constructor() {
    this.#init();
  }

  #init() {
    this.#lottos = null;
  }

  #setLottos(lottos) {
    this.#lottos = lottos;
  }

  getLottos() {
    return this.#lottos;
  }

  makeLottos(count) {
    const newLottos = Array.from({ length: count }).map(() => new Lotto());
    this.#setLottos(newLottos);
  }

  reset() {
    this.#setLottos(null);
  }
}

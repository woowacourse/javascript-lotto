import Lotto from './Lotto.js';

export default class Lottos {
  #lottos = null;

  get lottos() {
    return this.#lottos;
  }

  set lottos(lottos) {
    this.#lottos = lottos;
  }

  makeLottos(count) {
    const lottos = [...Array(count)].map(() => new Lotto());
    this.lottos = lottos;

    return lottos;
  }

  resetStatus() {
    this.lottos = null;
  }
}

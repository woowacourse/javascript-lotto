import Lotto from './Lotto.js';

export default class Lottos {
  #lottos = null;

  #setLottos(lottos) {
    this.#lottos = lottos;
  }

  getLottos() {
    return this.#lottos;
  }

  makeLottos(count) {
    const lottos = [...Array(count)].map(() => new Lotto());
    this.#setLottos(lottos);

    return lottos;
  }

  resetStatus() {
    this.#setLottos(null);
  }
}

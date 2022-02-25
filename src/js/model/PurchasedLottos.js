import LottoNumbers from './LottoNumbers.js';

export default class PurchasedLottos {
  #lottos = null;

  get lottos() {
    return this.#lottos;
  }

  set lottos(lottos) {
    this.#lottos = lottos;
  }

  purchaseLotto(count) {
    const newLottos = [...Array(count)].map(() => new LottoNumbers());
    this.#lottos = newLottos;

    return newLottos;
  }

  resetStatus() {
    this.#lottos = null;
  }
}

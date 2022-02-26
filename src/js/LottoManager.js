import Lotto from './Lotto';

export default class LottoManager {
  #lottos;

  constructor() {
    this.#lottos = [];
  }

  get lottos() {
    return this.#lottos;
  }

  generateNewLottos(count) {
    let currentCount;
    for (currentCount = 0; currentCount < count; currentCount += 1) {
      this.#lottos.push(new Lotto());
    }
  }
}

import Lotto from './Lotto';

export default class LottoManager {
  #lottos;

  constructor() {
    this.#lottos = [];
  }

  get lottos() { return this.#lottos; }

  generateNewLottos(count) {
    let currentCount = 0;
    while ( currentCount < count ) {
      this.#lottos.push(new Lotto());
      currentCount += 1;
    }
  }
}

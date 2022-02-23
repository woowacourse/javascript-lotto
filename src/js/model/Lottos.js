import Lotto from './Lotto.js';

export default class Lottos {
  constructor() {
    this.init();
  }

  init() {
    this.lottoList = null;
  }

  setLottos(lottos) {
    this.lottos = lottos;
  }

  getLottos() {
    return this.lottos;
  }

  makeLottos(count) {
    const newLottos = [...Array(count)].map(() => new Lotto());
    this.setLottos(newLottos);
  }
}

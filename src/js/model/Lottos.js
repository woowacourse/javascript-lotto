import Lotto from './Lotto.js';

export default class Lottos {
  constructor() {
    this.init();
  }

  init() {
    this.lottoList = null;
  }

  getLottos() {
    return this.lottos;
  }

  setLottos(lottos) {
    this.lottos = lottos;
  }

  makeLottos(count) {
    const newLottos = [...Array(count)].map(() => new Lotto());
    this.setLottos(newLottos);
  }
}

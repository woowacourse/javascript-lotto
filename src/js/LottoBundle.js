import Lotto from './Lotto';

export default class LottoBundle {
  constructor() {
    this.lottos = [];
  }

  createLottoBundle(count) {
    for (let index = 0; index < count; index++) {
      this.lottos.push(new Lotto());
    }
  }
}

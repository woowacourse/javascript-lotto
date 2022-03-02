import LottoCollection from './index.js';
import Lotto from './Lotto.js';

export default class LottoCollectionImpl extends LottoCollection {
  constructor() {
    super();
    this.lottos = [];
  }

  createLottos(count) {
    for (let i = 0; i < count; i += 1) {
      this.lottos.push(new Lotto());
    }
  }

  getLottos() {
    return this.lottos.map(({ numbers }) => [...numbers]);
  }

  resetLottos() {
    this.lottos.length = 0;
  }
}

import repeatCallback from '../utils/repeat.js';
import Lotto from './Lotto.js';

export default class LottoBundle {
  constructor() {
    this.lottos = [];
  }

  pushLottoToBundle() {
    const lotto = new Lotto();
    lotto.generateLottoNumbers();
    this.lottos.push(lotto);
  }

  createLottoBundle(count) {
    repeatCallback(count, () => this.pushLottoToBundle());
  }
}

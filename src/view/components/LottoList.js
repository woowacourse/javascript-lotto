import Component from '../../Component.js';
import { LottoStore } from '../../domain/Lotto.js';

export default class LottoList extends Component {
  setUp(total) {
    this.lottoList = LottoStore.purchase(total);
  }

  template() {
    const lottoResult = this.lottoList
      .map((lotto) => `[ ${lotto.getNumbers().join(', ')} ]`)
      .join('\n');
    return lottoResult;
  }
}

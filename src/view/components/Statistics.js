import Component from '../../Component.js';
import { LottoStore } from '../../domain/Lotto.js';
import generateMessages from '../../utils/generateMessages.js';

export default class Statistics extends Component {
  setUp({ lottoList }) {
    this.lottoList = lottoList;
  }

  template() {
    const statistics = LottoStore.calculateStatistics(this.lottoList);
    const earningRate = LottoStore.calculateEarningRate(this.lottoList);

    return generateMessages.result({ statistics, earningRate });
  }
}

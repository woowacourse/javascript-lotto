import Component from './Component.js';
import { LottoStore } from '../../domain/Lotto.js';
import generationMessage from '../../utils/generationMessages.js';

export default class Statistics extends Component {
  setUp({ lottoList }) {
    this.lottoList = lottoList;
  }

  template() {
    const statistics = LottoStore.calculateStatistics(this.lottoList);
    const earningRate = LottoStore.calculateEarningRate(this.lottoList);

    return generationMessage.result({ statistics, earningRate });
  }
}

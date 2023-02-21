import Component from './Component.js';
import LottoMachine from '../../domain/LottoMachine.js';
import generationMessage from '../../utils/generationMessages.js';

export default class Statistics extends Component {
  setUp({ lottoList }) {
    this.lottoList = lottoList;
  }

  template() {
    const statistics = LottoMachine.calculateStatistics(this.lottoList);
    const earningRate = LottoMachine.calculateEarningRate(this.lottoList);

    return generationMessage.result({ statistics, earningRate });
  }
}

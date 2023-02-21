import Component from './Component.js';
import generationMessages from '../../utils/generationMessages.js';

export default class LottoList extends Component {
  setUp({ lottoList }) {
    this.lottoList = lottoList;
  }

  template() {
    return generationMessages.lottoList(this.lottoList);
  }
}

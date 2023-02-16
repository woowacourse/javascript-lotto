import Component from '../../Component.js';
import generateMessages from '../../utils/generateMessages.js';

export default class LottoList extends Component {
  setUp({ lottoList }) {
    this.lottoList = lottoList;
  }

  template() {
    return generateMessages.lottoList(this.lottoList);
  }
}

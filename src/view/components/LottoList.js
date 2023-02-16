import Component from '../../Component.js';

export default class LottoList extends Component {
  setUp({ lottoList }) {
    this.lottoList = lottoList;
  }

  template() {
    return this.lottoList.map((lotto) => `[ ${lotto.getNumbers().join(', ')} ]`).join('\n');
  }
}

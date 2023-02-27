import Component from './Component.js';
import { getId } from '../../utils/domHelper.js';

export default class LottoList extends Component {
  lottoList;

  constructor({ getLottoList }) {
    super(getId('lotto-list-result-form'));
    this.lottoList = getLottoList();

    this.render();
  }

  template() {
    return `
    <span>총 ${this.lottoList && this.lottoList.length}개를 구매하였습니다.</span>
    <div id="lotto-list-container">${this.lottoList && this.spreadLottoList()}</div>
    `;
  }

  spreadLottoList() {
    return this.lottoList
      .map((lotto) => `<div><span>🎟</span> ${lotto.getNumbers().join(', ')}</div>`)
      .join('');
  }
}

import Component from './Component.js';
import { qs } from '../../utils/domHelper.js';

export default class LottoList extends Component {
  state;

  constructor(state) {
    super(qs('#lotto-list-result-form'), state);
  }

  template() {
    return `
    <span>총 7개를 구매하였습니다.</span>
    <div id="lotto-list-container">${this.spreadLottoList()}</div>
    `;
  }

  spreadLottoList() {
    return this.state.lottoList
      .map((lotto) => `<div><span>🎟</span> ${lotto.getNumbers().join(', ')}</div>`)
      .join('');
  }
}

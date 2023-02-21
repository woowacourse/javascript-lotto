import Component from '../../Component.js';
import { LOTTO } from '../../constants/values.js';
import { LottoStore } from '../../domain/Lotto.js';

export default class LottoList extends Component {
  template() {
    return `
      <div>총 7개를 구매하였습니다.</div>
      <ul>
        ${this.getLottoList()}
      </ul>
    `;
  }

  getLottoList() {
    const { amount } = this.props;
    const lottoList = LottoStore.purchase(amount / LOTTO.PRICE);

    return lottoList.map((lotto) => `<li>${lotto.getNumbers().join(', ')}</li>`).join('');
  }
}

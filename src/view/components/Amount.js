import Component from './Component.js';
import { LOTTO } from '../../constants/values.js';
import { LottoStore } from '../../domain/Lotto.js';
import { getFields } from '../../utils/domHelper.js';
import Validator from '../../validator/step2/index.js';

export default class Amount extends Component {
  setEvent() {
    this.addEvent('submit', '.lotto-store__amount-form', this.handleSubmitForm.bind(this));
  }

  template() {
    return `
      <label class='lotto-store__amount-label'>구입할 금액을 입력해 주세요.</label>
      <form class='lotto-store__amount-form'>
        <input class='lotto-store__amount-input' type='number' name='amount' placeholder='금액' min='1000'/>
        <button class='lotto-store__purchase-btn' type='submit'>구입</button>
      </form>
    `;
  }

  handleSubmitForm(e) {
    e.preventDefault();
    const { amount } = getFields(e.target);
    const { isValid } = Validator.Inputs.amount(Number(amount), { onError: alert });

    if (isValid) {
      const lottoList = LottoStore.purchase(Number(amount) / LOTTO.PRICE);

      this.props.setLottoList(lottoList);
    }
  }
}

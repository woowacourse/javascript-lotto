import Component from './Component.js';
import LottoMachine from '../../domain/LottoMachine.js';
import { getId } from '../../utils/domHelper.js';
import { ERROR, LOTTO } from '../../constant/constants.js';

export default class Amount extends Component {
  setter;
  appthis;

  constructor(setter, appthis) {
    super(getId('input-purchase-form'));
    this.setter = setter;
    this.appthis = appthis;

    this.addEvent('submit', this.submitAmount.bind(this));
  }

  template() {
    return `
      <span>구입할 금액을 입력해주세요.</span>
      <form action="submit" id="input-purchase-container">
        <input type="number" min="1000" max="10000000" placeholder="금액" autofocus required/>
        <button>구입</button>
      </form>
      <div id="amount-exception"></div>
    `;
  }

  submitAmount(event) {
    event.preventDefault();

    const amount = Number(event.target[0].value);
    if (amount % LOTTO.PRICE !== 0) {
      this.renderAmountException(event);
      return;
    }

    const lottoList = LottoMachine.purchase(amount / LOTTO.PRICE);
    this.setter({ lottoList });
    this.appthis.render();
  }

  renderAmountException(event) {
    event.target.nextElementSibling.innerText = `${ERROR.INVALID_AMOUNT_UNIT(LOTTO.PRICE)}`;
  }
}

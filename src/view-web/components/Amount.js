import Component from './Component.js';
import LottoMachine from '../../domain/LottoMachine.js';
import { qs } from '../../utils/domHelper.js';
import { LOTTO } from '../../constant/constants.js';

export default class Amount extends Component {
  setter;

  constructor(setter) {
    super(qs('#input-purchase-form'));
    this.setter = setter;

    this.addEvent('submit', this.submitAmount.bind(this));
  }

  template() {
    return `
      <span>구입할 금액을 입력해주세요.</span>
      <form action="submit" id="input-purchase-container">
        <input type="number" min="1000" max="10000000" placeholder="금액" />
        <button>구입</button>
      </form>
    `;
  }

  submitAmount(event) {
    event.preventDefault();

    const amount = Number(event.target[0].value);
    const lottoList = LottoMachine.purchase(amount / LOTTO.PRICE);

    this.setter({ lottoList });
  }
}

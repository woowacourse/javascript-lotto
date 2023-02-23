import Component from './Component.js';
import LottoMachine from '../../domain/LottoMachine.js';
import { qs } from '../../utils/domHelper.js';
import { LOTTO } from '../../constant/constants.js';

export default class Amount extends Component {
  setter;

  constructor(setter) {
    super(qs('#comfirmation-lotto-number-form'));
    this.setter = setter;

    this.addEvent('submit', this.submitAmount.bind(this));
  }

  template() {
    return `
    <header>
      <h2>🎱 내 번호 당첨 확인 🎱</h2>
    </header>

    <section id="input-purchase-form">
      <span>구입할 금액을 입력해주세요.</span>
      <form action="submit" id="input-purchase-container">
        <input type="text" placeholder="금액" />
        <button>구입</button>
      </form>
    </section>
    `;
  }

  submitAmount(event) {
    event.preventDefault();

    const amount = Number([...event.target.children][0].value);
    const lottoList = LottoMachine.purchase(amount / LOTTO.PRICE);

    this.setter({ lottoList });
  }
}

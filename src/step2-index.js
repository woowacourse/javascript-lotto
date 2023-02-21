import Component from './Component.js';
import { qs, component } from './utils/domHelper';
import Header from './view/components/Header.js';
import Amount from './view/components/Amount.js';
import LottoList from './view/components/LottoList.js';
import WinNumbers from './view/components/WinNumbers.js';

class App extends Component {
  constructor() {
    super(qs('#app'));
  }

  setUp() {
    this.state = { amount: 0 };
  }

  mounted() {
    const {
      state: { amount },
      setAmount,
    } = this;

    new Header(component('header'));
    new Amount(component('amount'), { setAmount: setAmount.bind(this) });
    new LottoList(component('lottoList'), { amount });
    new WinNumbers(component('winNumbers'));
  }

  template() {
    return `
      <header data-component='header'></header> 
      <section data-component='amount'></section>
      <section data-component='lottoList'></section>
      <section data-component='winNumbers'></section>
    `;
  }

  setAmount(amount) {
    this.setState({ amount });
  }
}

new App();

import Component from './Component.js';
import { qs, component } from './utils/domHelper';
import Header from './view/components/Header.js';
import Amount from './view/components/Amount.js';

class App extends Component {
  constructor() {
    super(qs('#app'));
  }

  setUp() {
    this.state = { amount: 0 };
  }

  mounted() {
    const { setAmount } = this;

    new Header(component('header'));
    new Amount(component('amount'), { setAmount: setAmount.bind(this) });
  }

  template() {
    return `
      <header data-component='header'></header> 
      <section data-component='amount' />
    `;
  }

  setAmount(amount) {
    this.setState({ amount });
  }
}

new App();

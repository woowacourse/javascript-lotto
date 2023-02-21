import Component from './Component.js';
import { qs, component } from './utils/domHelper';
import Header from './view/components/Header.js';
import Amount from './view/components/Amount.js';

class App extends Component {
  constructor() {
    super(qs('#app'));
  }

  mounted() {
    new Header(component('header'));
    new Amount(component('amount'));
  }

  template() {
    return `
      <header data-component='header'></header> 
      <section data-component='amount' />
    `;
  }
}

new App();

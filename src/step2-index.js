import Component from './Component.js';
import Header from './view/components/Header.js';
import { qs, component } from './utils/domHelper';

class App extends Component {
  constructor() {
    super(qs('#app'));
  }

  mounted() {
    new Header(component('header'));
  }

  template() {
    return `<header data-component='header' />`;
  }
}

new App();

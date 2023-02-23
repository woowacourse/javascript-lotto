import '../main.css';
import Component from './view-web/components/Component.js';
import Amount from './view-web/components/Amount.js';
import { qs } from './utils/domHelper.js';

class App extends Component {
  state;

  constructor() {
    super(qs('#app'));
  }

  setUp() {
    this.state = { lottoList: [] };
  }

  mount() {
    new Amount(this.setState.bind(this));
  }

  template() {
    return `
    <div id="document-title"><h1>🎱 행운의 로또</h1></div>
    <article id="comfirmation-lotto-number-form"></article>
    `;
  }
}

new App();

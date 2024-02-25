import './LottoApp.css';
import './components/LottoHeader.js';
import './components/LottoMain.js';
import './components/LottoFooter.js';

const LOTTO_APP_COMPONENT = `
  <lotto-header></lotto-header>
  <lotto-main></lotto-main>
  <lotto-footer></lotto-footer>
    `;

class LottoApp extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = LOTTO_APP_COMPONENT;
  }
}

customElements.define('lotto-app', LottoApp);

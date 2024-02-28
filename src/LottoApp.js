import './LottoApp.css';
import './components/LottoHeader.js';
import './components/LottoMain.js';
import './components/LottoFooter.js';
import './components/LottoResultModal.js';
import LottoWebController from './controller/LottoWebController.js';

const LOTTO_APP_COMPONENT = `
  <lotto-header></lotto-header>
  <lotto-main></lotto-main>
  <lotto-footer></lotto-footer>

  <lotto-result-modal></lotto-result-modal>
    `;

class LottoApp extends HTMLElement {
  #lottoWebController;

  constructor() {
    super();
    this.#lottoWebController = new LottoWebController();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = LOTTO_APP_COMPONENT;
  }

  controller() {
    return this.#lottoWebController;
  }
}

customElements.define('lotto-app', LottoApp);

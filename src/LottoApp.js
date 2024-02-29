import './reset.css';
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
    `;

class LottoApp extends HTMLElement {
  #lottoWebController;

  constructor() {
    super();
    this.#lottoWebController = new LottoWebController();
  }

  connectedCallback() {
    this.render();
    this.#setEventListener();
  }

  render() {
    this.innerHTML = LOTTO_APP_COMPONENT;
  }

  controller() {
    return this.#lottoWebController;
  }

  #setEventListener() {
    const lottoMain = this.querySelector('lotto-main');
    lottoMain.addEventListener('lottoResult', () => {
      const lottoResultModal = document.createElement('lotto-result-modal');
      this.appendChild(lottoResultModal);
    });
  }
}

customElements.define('lotto-app', LottoApp);

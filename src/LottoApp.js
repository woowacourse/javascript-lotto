import './LottoApp.css';
import './components/LottoHeader.js';
import './components/LottoFooter.js';

const LOTTO_APP_COMPONENT = `
  <lotto-header></lotto-header>
  <div class='lotto-main'>
    <div>
      행배야 오늘 날씨 디진다~
    </div>
  </div>
  <lotto-footer></lotto-footer>
    `;

class LottoApp extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = LOTTO_APP_COMPONENT;
    // const lottoHeaderElement = document.getElementById('lotto-header');
    // const lottoHeader = new LottoHeader();
    // lottoHeader.render(lottoHeaderElement);
  }
}

customElements.define('lotto-app', LottoApp);

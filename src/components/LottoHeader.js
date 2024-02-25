import './LottoHeader.css';

const LOTTO_HEADER_COMPONENT = `
  <div class="lotto-header-container">
      <h1 class="lotto-title">🎱 행운의 로또</h1>
  </div>
`;

class LottoHeader extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = LOTTO_HEADER_COMPONENT;
  }
}

customElements.define('lotto-header', LottoHeader);

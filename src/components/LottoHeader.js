import './LottoHeader.css';

const LOTTO_HEADER = `
  <h1 class="lotto-title">🎱 행운의 로또</h1>
`;

class LottoHeader extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = LOTTO_HEADER;
  }
}

customElements.define('lotto-header', LottoHeader);

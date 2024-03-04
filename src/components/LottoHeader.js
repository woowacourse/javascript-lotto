import './LottoHeader.css';

const LOTTO_HEADER = `
  <header class="lotto-title">🎱 행운의 로또</header>
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

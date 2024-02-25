import './LottoFooter.css';

const LOTTO_FOOTER_COMPONENT = `
  <div class="lotto-footer-container">
      <h1 class="lotto-caption">Copyright 2023. woowacourse</h1>
  </div>
`;

class LottoFooter extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = LOTTO_FOOTER_COMPONENT;
  }
}

customElements.define('lotto-footer', LottoFooter);

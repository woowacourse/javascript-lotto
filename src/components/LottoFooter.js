import './LottoFooter.css';

const LOTTO_FOOTER_COMPONENT = `
  <h3 class="lotto-caption">Copyright 2023. woowacourse</h3>
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

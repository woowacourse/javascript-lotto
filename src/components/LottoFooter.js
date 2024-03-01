import './LottoFooter.css';

const LOTTO_FOOTER = `
  <footer class="lotto-caption">Copyright 2023. woowacourse</footer>
`;

class LottoFooter extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = LOTTO_FOOTER;
  }
}

customElements.define('lotto-footer', LottoFooter);

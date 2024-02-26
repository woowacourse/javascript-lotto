import './LottoNumbers.css';

const LOTTO_NUMBERS = `
<div class="lotto-icon">🎟️</div>
<div class="lotto-numbers-container">
  <p class="lotto-body">1, 2, 3, 4, 5, 6</p>
</div>
`;

class LottoNumbers extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = LOTTO_NUMBERS;
  }
}

customElements.define('lotto-numbers', LottoNumbers);

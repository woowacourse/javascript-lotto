import './LottoNumbers.css';

const LOTTO_NUMBERS = (numbers) => `
<div class="lotto-icon">🎟️</div>
<div class="lotto-numbers-container">
  <p class="lotto-body">${numbers}</p>
</div>
`;

class LottoNumbers extends HTMLElement {
  connectedCallback() {
    const numbers = this.getAttribute('numbers').split(',').join(', ');

    this.render(numbers);
  }

  render(numbers) {
    this.innerHTML = LOTTO_NUMBERS(numbers);
  }
}

customElements.define('lotto-numbers', LottoNumbers);

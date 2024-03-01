import './LottoButton.css';

const LOTTO_BUTTON = `
  <button class="lotto-caption" disabled="true">
    <main class="lotto-caption">
      text
    </main>
  </button>
`;

class LottoButton extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setIsDisabled(true);
  }

  render() {
    this.innerHTML = LOTTO_BUTTON;
    this.setText();
  }

  setText(text) {
    this.querySelector('.lotto-caption').textContent = text;
  }

  setIsDisabled(bool) {
    this.querySelector('button').disabled = bool;
  }

  getIsDisabled() {
    return this.querySelector('button').disabled;
  }
}

customElements.define('lotto-button', LottoButton);

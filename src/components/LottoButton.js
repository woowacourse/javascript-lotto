import './LottoButton.css';

//TODO: 텍스트 container로 감싸기
const LOTTO_BUTTON = `
  <h3 class="lotto-caption">text</h3>
`;

class LottoButton extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = LOTTO_BUTTON;
    this.setText();
  }

  setText(text) {
    this.querySelector('.lotto-caption').textContent = text;
  }
}

customElements.define('lotto-button', LottoButton);

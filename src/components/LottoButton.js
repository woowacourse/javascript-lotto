import './LottoButton.css';

//TODO: 텍스트 container로 감싸기
const LOTTO_BUTTON_COMPONENT = `
  <h3 class="lotto-caption">text</h3>
`;

class LottoButton extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = LOTTO_BUTTON_COMPONENT;
    this.setText();
  }

  setText(text) {
    this.querySelector('.lotto-caption').textContent = text;
  }
}

customElements.define('lotto-button', LottoButton);

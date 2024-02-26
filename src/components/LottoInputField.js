import './LottoInputField.css';

const LOTTO_INPUT_FIELD_COMPONENT = `
  <input class="lotto-input" type="text" placeholder="금액"></input>
`;

class LottoInputField extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = LOTTO_INPUT_FIELD_COMPONENT;
  }
}

customElements.define('lotto-input-field', LottoInputField);

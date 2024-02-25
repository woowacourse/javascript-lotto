import './LottoInputField.css';

const LOTTO_HEADER_COMPONENT = `
  <input placeholder='금액'></input>
`;

class LottoInputField extends HTMLFormElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = LOTTO_HEADER_COMPONENT;
  }
}

customElements.define('lotto-input-field', LottoInputField);

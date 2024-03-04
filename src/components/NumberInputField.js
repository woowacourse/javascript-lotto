import './NumberInputField.css';

const NUMBER_INPUT_FIELD = `
  <input class="number-input" type="number"></input>
`;

class NumberInputField extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = NUMBER_INPUT_FIELD;
  }

  getValue() {
    const inputField = this.querySelector('.number-input');
    if (!inputField) {
      throw new AppError('".number-input"를 찾을 수 없습니다.');
    }
    return inputField.getValue();
}

customElements.define('number-input-field', NumberInputField);

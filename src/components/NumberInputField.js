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
    return this.querySelector('.number-input').value;
  }
}

customElements.define('number-input-field', NumberInputField);

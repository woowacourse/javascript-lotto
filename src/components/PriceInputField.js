import './PriceInputField.css';

const LOTTO_INPUT_FIELD_COMPONENT = `
  <input class="price-input" type="text" placeholder="금액"></input>
`;

class PriceInputField extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = LOTTO_INPUT_FIELD_COMPONENT;
  }
}

customElements.define('price-input-field', PriceInputField);

import './PriceInputField.css';

const PRICE_INPUT_FIELD = `
  <input class="price-input" type="number" placeholder="금액"></input>
`;

class PriceInputField extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = PRICE_INPUT_FIELD;
  }

  getValue() {
    return this.querySelector('.price-input').value;
  }
}

customElements.define('price-input-field', PriceInputField);

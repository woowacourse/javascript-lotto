import './PriceInputField.css';

const PRICE_INPUT_FIELD = `
  <div class ="error-message"></div>
  <input class="price-input" type="text" placeholder="금액"></input>
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

  setErrorMessage(error) {
    this.querySelector('.error-message').textContent = error.message;
  }
}

customElements.define('price-input-field', PriceInputField);

import ViewComponent from '../core/ViewComponent.js';
import { PURCHASE_FORM_SELECTORS } from '../../../common/constants/PurchaseFormConstants.js';
import { PURCHASE_PRICE } from '../../../common/constants/Configurations.js';

class PurchaseFormView extends ViewComponent {
  constructor($container) {
    super($container);
    this.render();
    this.#bindEvents();
  }

  render() {
    this.$container.innerHTML = this.#template();
    this.$input = this.$container.querySelector(PURCHASE_FORM_SELECTORS.INPUT);
    this.$button = this.$container.querySelector(
      PURCHASE_FORM_SELECTORS.BUTTON,
    );
  }

  #template() {
    return `
      <label>구입할 금액을 입력해주세요.</label>
      <div class="purchase-price-input">
        <input class="purchase-input" type="number" placeholder="금액 (1,000원 단위로 최대 1,000,000원)" min="${PURCHASE_PRICE.MIN}" step="${PURCHASE_PRICE.UNIT}" max="${PURCHASE_PRICE.MAX}" />
        <button class="purchase-button" disabled>구입</button>
      </div>
    `;
  }

  #bindEvents() {
    this.#removeEvents();
    this.$input.addEventListener('input', this.#handleInputChange);
    this.$container.addEventListener('submit', this.#handleFormSubmit);
  }

  #removeEvents() {
    if (this.$input) {
      this.$input.removeEventListener('input', this.#handleInputChange);
    }

    if (this.$container) {
      this.$container.removeEventListener('submit', this.#handleFormSubmit);
    }
  }

  #handleInputChange = () => {
    this.$button.disabled = this.$input.value.trim() === '';
  };

  #handleFormSubmit = (e) => {
    e.preventDefault();
    if (!this.onPurchaseClick) return;

    const purchasePrice = parseInt(this.$input.value, 10);
    this.onPurchaseClick(purchasePrice);
  };

  setOnPurchaseClick(callback) {
    this.onPurchaseClick = callback;
  }

  disableInput() {
    this.$input.disabled = true;
    this.$button.disabled = true;
  }
}

export default PurchaseFormView;

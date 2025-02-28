import ViewComponent from '../core/ViewComponent.js';
import { SELECTORS } from '../../../common/constants/PurchaseFormConstants.js';

class PurchaseFormView extends ViewComponent {
  constructor($container) {
    super($container);
    this.render();
    this.#bindEvents();
  }

  render() {
    this.$container.innerHTML = this.#template();
    this.$input = this.$container.querySelector(SELECTORS.INPUT);
    this.$button = this.$container.querySelector(SELECTORS.BUTTON);
  }

  #template() {
    return `
      <label>구입할 금액을 입력해주세요.</label>
      <div class="purchase-price-input">
        <input type="text" placeholder="금액" />
        <button class="purchase-button" disabled>구입</button>
      </div>
    `;
  }

  #bindEvents() {
    this.$input.addEventListener('input', () => {
      this.$button.disabled = this.$input.value.trim() === '';
    });

    this.$container.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.onPurchaseClick) {
        const purchasePrice = parseInt(this.$input.value, 10);
        this.onPurchaseClick(purchasePrice);
      }
    });
  }

  setOnPurchaseClick(callback) {
    this.onPurchaseClick = callback;
  }

  disableInput() {
    this.$input.disabled = true;
    this.$button.disabled = true;
  }
}

export default PurchaseFormView;

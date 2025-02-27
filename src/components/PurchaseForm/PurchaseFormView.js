import ViewComponent from '../core/ViewComponent.js';
import { SELECTORS } from '../../constants/PurchaseFormConstants.js';

class PurchaseFormView extends ViewComponent {
  render() {
    this.$container.innerHTML = this.template();
    this.$input = this.$container.querySelector(SELECTORS.INPUT);
    this.$button = this.$container.querySelector(SELECTORS.BUTTON);
  }

  template() {
    return `
      <label>구입할 금액을 입력해주세요.</label>
      <div class="purchase-price-input">
        <input type="text" placeholder="금액" />
        <button class="purchase-button" disabled>구입</button>
      </div>
    `;
  }

  bindEvents() {
    // 입력값이 있으면 버튼 활성화
    this.$input.addEventListener('input', () => {
      this.$button.disabled = this.$input.value.trim() === '';
    });

    // 버튼 클릭 시 도메인 로직(콜백) 호출
    this.$button.addEventListener('click', () => {
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

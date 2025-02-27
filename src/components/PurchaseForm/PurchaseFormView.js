// PurchaseFormView.js
import ViewComponent from '../core/ViewComponent.js';

class PurchaseFormView extends ViewComponent {
  render() {
    this.container.innerHTML = this.template();
    this.input = this.container.querySelector('.purchase-price-input input');
    this.button = this.container.querySelector('.purchase-price-input button');
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
    // 단순히 UI 상태 변경만 처리: 입력값이 있으면 버튼 활성화
    this.input.addEventListener('input', () => {
      this.button.disabled = this.input.value.trim() === '';
    });

    // 버튼 클릭 이벤트는 도메인 로직을 위한 콜백으로 전달
    this.button.addEventListener('click', () => {
      if (this.onPurchaseClick) {
        const purchasePrice = parseInt(this.input.value, 10);
        this.onPurchaseClick(purchasePrice);
      }
    });
  }

  // 외부(Controller)에서 구매 버튼 클릭 이벤트에 대한 콜백 등록
  setOnPurchaseClick(callback) {
    this.onPurchaseClick = callback;
  }

  disableInput() {
    this.input.disabled = true;
    this.button.disabled = true;
  }
}

export default PurchaseFormView;

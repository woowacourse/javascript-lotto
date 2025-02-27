import { PurchasePriceValidator } from '../validators/PurchasePriceValidator.js';

class PurchaseForm {
  constructor(container) {
    this.container = container;
    this.render();
    this.bindEvents();
  }

  render() {
    // 기존 HTML에 구매 폼 영역만 추가합니다.
    this.container.innerHTML = `
      <label>구입할 금액을 입력해주세요.</label>
      <div class="purchase-price-input">
        <input type="text" placeholder="금액" />
        <button class="purchase-button" disabled>구입</button>
      </div>
    `;
    this.input = this.container.querySelector('.purchase-price-input input');
    this.button = this.container.querySelector('.purchase-price-input button');
  }

  bindEvents() {
    // 입력 값이 없으면 버튼 비활성화
    this.input.addEventListener('input', () => {
      this.button.disabled = this.input.value.trim() === '';
    });

    // '구입' 버튼 클릭 시 이벤트 발생
    this.button.addEventListener('click', () => {
      const purchasePrice = parseInt(this.input.value, 10);
      try {
        PurchasePriceValidator.validate(purchasePrice);
        // 유효성 검사를 통과하면 purchaseMade 커스텀 이벤트 발생
        const event = new CustomEvent('purchaseLottos', {
          detail: purchasePrice,
          bubbles: true,
        });
        this.container.dispatchEvent(event);
        this.input.disabled = true;
        this.button.disabled = true;
      } catch (e) {
        alert(e.message);
      }
    });
  }
}

export default PurchaseForm;

import Component from '../lib/core/Component.js';

class PaymentInput extends Component {
  mountTemplate() {
    this.$target.innerHTML = `
        <label class="mb-2 d-inline-block">
        구입할 금액을 입력해주세요.
        </label>
        <div class="d-flex">
          <input
            id="payment-input"
            type="number"
            class="w-100 mr-2 pl-2"
            placeholder="구입 금액"
          />
          <button id="payment-submit" type="submit" class="btn btn-cyan">확인</button>
        </div>
    `;
  }

  initEvent() {
    this.$target.addEventListener('click', ({ target }) => {
      if (target.id === 'payment-submit') {
        // 검증과 할당을 하자
      }
    });
  }
}

export default PaymentInput;

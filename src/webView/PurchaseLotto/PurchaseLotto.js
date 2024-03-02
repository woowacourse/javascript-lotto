import PurchaseLottoListener from './PurchaseLottoListener';
import BaseComponent from '../BaseComponent/BaseComponent';

class PurchaseLotto extends BaseComponent {
  render() {
    this.innerHTML = `      <div class="purchase"> 
<label class="purchase__label text-lotto-body">구입할 금액을 입력해주세요.</label>
<div class="purchase-form">
  <input
    class="purchase-form__input"
    type="number"
    placeholder="금액"
    aria-describedby="error-purchase-money"
  />
  <button class="purchase-form__button button-primary">구입</button>
</div>
<div id="error-purchase-money" class="text-lotto-error"></div>
</div>`;
  }
  setEvent() {
    this.on(
      { target: '.purchase-form__button', eventName: 'click' },
      PurchaseLottoListener.purchaseLottoListener,
    );
  }
}

customElements.define('purchase-lotto', PurchaseLotto);

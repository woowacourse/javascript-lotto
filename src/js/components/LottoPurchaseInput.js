import { $, clearInputValue } from '../utils/dom.js';
import { store } from './App.js';
import { divide, mod } from '../utils/common.js';
import { ERROR_MESSAGE, GUIDE_MESSAGE } from '../utils/message.js';
import { LOTTO } from '../utils/constants.js';
import { createLottos, updatePayment } from '../redux/action.js';
import Component from '../core/Component.js';
import Button from './Button/Button.js';
import Input from './Input/Input.js';

export default class LottoPurchaseInput extends Component {
  mainTemplate() {
    return `
    <div class="d-flex flex-col">
      <label class="mb-2 d-inline-block">구입할 금액을 입력해주세요.
      </label>
      <div class="d-flex">
        ${new Input({
          id: 'lotto-purchase-input',
          classes: ['w-100', 'mr-2', 'pl-2'],
          type: 'number',
          placeholder: '구입 금액',
        }).mainTemplate()}
        ${new Button({
          id: 'lotto-purchase-btn',
          type: 'button',
          classes: ['btn', 'btn-cyan'],
          disabled: true,
          text: '확인',
        }).mainTemplate()}
      </div>
    </div>
    <p data-section="purchaseInputMessage" class="text-xs text-center"></p>
    `;
  }

  setup() {
    store.subscribe(this.render.bind(this));
  }

  selectDOM() {
    this.$lottoPurchaseInputContainer = $('#lotto-purchase-input-container');
    this.$purchaseInput = $('#lotto-purchase-input');
    this.$purchaseButton = $('#lotto-purchase-btn');
    this.$purchaseInputMessage = $('[data-section=purchaseInputMessage]');
  }

  bindEvent() {
    this.$purchaseInput.addEventListener(
      'keyup',
      this.onChangeInput.bind(this),
    );
    this.$purchaseButton.addEventListener('click', this.onSubmit.bind(this));
    this.$lottoPurchaseInputContainer.addEventListener(
      'submit',
      this.onSubmit.bind(this),
    );
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.$purchaseButton.disabled) return;
    store.dispatch(updatePayment(Number(this.$purchaseInput.value)));
    store.dispatch(createLottos());
  }

  onChangeInput(e) {
    const [text, result] = this.validatePurchaseInputValue(e.target.value);
    this.$purchaseInputMessage.textContent = text;
    if (result === 'success') {
      this.$purchaseInputMessage.style.color = 'green';
      this.$purchaseButton.disabled = false;
    } else if (result === 'error') {
      this.$purchaseInputMessage.style.color = 'red';
      this.$purchaseButton.disabled = true;
    }
  }

  validatePurchaseInputValue = number => {
    const payment = Number(number);
    if (!Number.isInteger(payment)) {
      return [ERROR_MESSAGE.NOT_INTEGER_NUMBER, 'error'];
    }

    if (payment < LOTTO.PRICE) {
      return [ERROR_MESSAGE.PAYMENT_AMOUNT, 'error'];
    }

    return [ERROR_MESSAGE.VALID_INPUT_NUMBER, 'success'];
  };

  render(prevStates, states) {
    //fail case
    if (states === undefined) {
      this.$target.innerHTML = this.mainTemplate();
      return;
    }

    if (states.payment === 0) {
      clearInputValue(this.$purchaseInput);
      this.$purchaseInput.disabled = false;
      this.$purchaseButton.disabled = true;
      this.$purchaseInputMessage.textContent = '';
      return;
    }

    // success case
    if (prevStates.payment !== states.payment) {
      const lottoCount = divide(states.payment, LOTTO.PRICE);
      const remainingMoney = mod(states.payment, LOTTO.PRICE);
      alert(GUIDE_MESSAGE.PAYMENT_RESULT_MESSAGE(lottoCount, remainingMoney));
      this.$purchaseInput.disabled = true;
      this.$purchaseButton.disabled = true;
      this.$purchaseInputMessage.textContent = '';
    }
  }
}

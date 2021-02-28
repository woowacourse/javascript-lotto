import { LOTTO } from '../utils/constants.js';
import { $, clearInputValue } from '../utils/dom.js';
import { ERROR_MESSAGE } from '../utils/message.js';
import {
  changePurchaseType,
  createLottos,
  updatePayment,
} from '../redux/action.js';
import { store } from '../index.js';
import Component from '../core/Component.js';
import Button from './Button/Button.js';
import Input from './Input/Input.js';
import ManualLottoInput from './ManualLottoInput.js';
import { MANUAL_PURCHASE } from '../redux/actionType.js';

export default class LottoPurchaseInput extends Component {
  initRender() {
    this.$target.innerHTML = `
    <div class="d-flex flex-col">
      <div class="d-flex justify-between items-center">
        <label class="mb-2 d-inline-block">구입할 금액을 입력해주세요.
        </label>
        <div class="flex-auto d-flex justify-end pr-1 mb-2">
          <label class="switch">
            ${new Input({
              type: 'checkbox',
              classes: ['purchase-type-toggle-button'],
            }).getTemplate()}
            <span class="text-base font-normal">수동구매</span>
          </label>
        </div>
      </div>
      <div class="d-flex">
        ${new Input({
          id: 'lotto-purchase-input',
          classes: ['w-100', 'mr-2', 'pl-2'],
          type: 'number',
          placeholder: '구입 금액',
        }).getTemplate()}
        ${new Button({
          id: 'lotto-purchase-btn',
          type: 'button',
          classes: ['btn', 'btn-cyan'],
          disabled: true,
          text: '확인',
        }).getTemplate()}
      </div>
    </div>
    <p data-section="messageBox" class="text-xs text-center"></p>
    <div id="manual-lotto-input-container" class="d-none"></div>
    `;

    this.mountComponent();
  }

  setup() {
    store.subscribe(this.render.bind(this));
  }

  mountComponent() {
    this.manualLottoInput = new ManualLottoInput(
      $('#manual-lotto-input-container'),
    );
  }

  selectDOM() {
    this.$purchaseInput = $('#lotto-purchase-input');
    this.$purchaseButton = $('#lotto-purchase-btn');
    this.$messageBox = $('[data-section=messageBox]');
    this.$purchaseTypeToggleButton = $('.purchase-type-toggle-button');
  }

  bindEvent() {
    this.$purchaseInput.addEventListener(
      'keyup',
      this.onChangeInput.bind(this),
    );
    this.$purchaseButton.addEventListener('click', this.onSubmit.bind(this));
  }

  onSubmit() {
    const payment = Number(this.$purchaseInput.value);
    store.dispatch(updatePayment(payment));
    if (this.$purchaseTypeToggleButton.checked) {
      store.dispatch(changePurchaseType(MANUAL_PURCHASE));
    } else {
      store.dispatch(createLottos(payment));
    }
  }

  onChangeInput(e) {
    if (e.key === 'Enter') {
      if (this.$purchaseButton.disabled) return;
      this.onSubmit();
      return;
    }
    const [text, result] = this.validatePurchaseInputValue(e.target.value);
    this.$messageBox.textContent = text;
    if (result === 'success') {
      this.$messageBox.style.color = 'green';
      this.$purchaseButton.disabled = false;
    } else if (result === 'error') {
      this.$messageBox.style.color = 'red';
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

  clearView() {
    clearInputValue(this.$purchaseInput);
    this.$purchaseInput.disabled = false;
    this.$purchaseTypeToggleButton.checked = false;
    this.$purchaseTypeToggleButton.disabled = false;
    this.$purchaseButton.disabled = true;
    this.$messageBox.textContent = '';
    return;
  }

  disableInputArea() {
    this.$purchaseInput.disabled = true;
    this.$purchaseButton.disabled = true;
    this.$purchaseTypeToggleButton.disabled = true;
    this.$messageBox.textContent = '';
  }

  render(prevStates, states) {
    if (states.payment === -1) {
      this.clearView();
      return;
    }

    if (prevStates.payment !== states.payment) {
      this.disableInputArea();
    }
  }
}

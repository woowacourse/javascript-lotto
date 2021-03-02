import { $, $$, clearInputValue } from '../utils/dom.js';
import { store } from '../index.js';
import { LOTTO, PURCHASE_TYPE } from '../utils/constants.js';
import {
  changePurchaseType,
  createLottos,
  updatePayment,
} from '../redux/action.js';
import { AUTO_PURCHASE } from '../redux/actionType.js';
import Button from './Button/Button.js';
import LottoNumbersInput from './Input/LottoNumbersInput.js';
import Component from '../core/Component.js';

export default class ManualLottoInput extends Component {
  initRender() {
    this.$target.innerHTML = `
    <div class="d-flex flex-col flex-grow justify-around">
      <div class="w-100 d-flex justify-around items-center py-1">
        <div class="w-100 d-flex justify-start">
          <span> 잔액: <span id="payment-amount">0</span>원</span> 
        </div>
      </div>
      <div id="manual-lotto-input-area" class="w-100 my-3 d-flex justify-around items-center">
        ${new LottoNumbersInput({
          classes: ['manual-lotto-number', 'mx-1', 'text-center', 'w-100'],
          maxlength: 2,
        }).getTemplate()}
        ${new Button({
          id: 'manual-lotto-purchase-btn',
          type: 'button',
          classes: ['btn', 'btn-cyan'],
          disabled: true,
          text: '수동구매',
        }).getTemplate()}
        </div>
        <p data-section="messageBox" class="text-xs text-center"></p>
            ${new Button({
              id: 'manual-lotto-finish-btn',
              type: 'button',
              classes: ['btn', 'btn-cyan', 'w-100'],
              disabled: false,
              text: '잔액으로 자동구매 하기',
            }).getTemplate()}
    </div>
        `;
  }

  setup() {
    store.subscribe(this.render.bind(this));
  }

  selectDOM() {
    this.$currPaymentAmount = $('#payment-amount');
    this.$manualLottoInputArea = $('#manual-lotto-input-area');
    this.$numberInputs = $$('input', this.$manualLottoInputArea);
    this.$messageBox = $('[data-section=messageBox]', this.$target);
    this.$manualLottoPurchaseButton = $('#manual-lotto-purchase-btn');
    this.$manualLottoFinishButton = $('#manual-lotto-finish-btn');
  }

  onMoveCursorToNextInput({ target }) {
    if (target.value.length > 1) {
      target.value = target.value.slice(0, 2);
      if (target.nextElementSibling) target.nextElementSibling.focus();
    }
  }

  onKeyUpNumberInput(e) {
    this.onMoveCursorToNextInput(e);
    const lottoNumbers = Array.from(this.$numberInputs).map(input =>
      input.value === '' ? '' : Number(input.value),
    );
    const [text, result] = LottoNumbersInput.validateLottoNumbersInputValue(
      lottoNumbers,
    );
    this.$messageBox.textContent = text;
    if (result === 'success') {
      this.$messageBox.style.color = 'green';
      this.$manualLottoPurchaseButton.disabled = false;
    } else if (result === 'error') {
      this.$messageBox.style.color = 'red';
      this.$manualLottoPurchaseButton.disabled = true;
    }
  }

  onClickPurchaseButton() {
    const lottoNumbers = this.$numberInputs.map(({ value }) => Number(value));
    const nextPaymentState = store.getStates().payment - LOTTO.PRICE;
    this.clearInputArea();
    if (nextPaymentState >= 0) {
      store.dispatch(updatePayment(nextPaymentState));
      store.dispatch(
        createLottos({
          lottoNumbers,
          purchaseType: store.getStates().purchaseType,
        }),
      );
    }
  }

  onClickFinishButton() {
    this.clearView();
    store.dispatch(changePurchaseType(AUTO_PURCHASE));
    store.dispatch(
      createLottos({
        payment: store.getStates().payment,
        purchaseType: PURCHASE_TYPE.AUTO,
      }),
    );
  }

  bindEvent() {
    this.$numberInputs.forEach($elem =>
      $elem.addEventListener('keyup', this.onKeyUpNumberInput.bind(this)),
    );
    this.$manualLottoPurchaseButton.addEventListener(
      'click',
      this.onClickPurchaseButton.bind(this),
    );
    this.$manualLottoFinishButton.addEventListener(
      'click',
      this.onClickFinishButton.bind(this),
    );
  }

  clearView() {
    this.$target.classList.add('d-none');
    this.clearInputArea();
  }

  clearInputArea() {
    this.$messageBox.textContent = '';
    this.$manualLottoPurchaseButton.disabled = true;
    this.$numberInputs.forEach(clearInputValue);
  }

  render(_, states) {
    if (states.payment === -1) {
      this.clearView();
      return;
    }

    if (states.purchaseType === PURCHASE_TYPE.MANUAL) {
      this.$currPaymentAmount.textContent = states.payment;
      this.$target.classList.remove('d-none');
    }
  }
}

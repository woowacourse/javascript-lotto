import { $, clearInputValue } from '../utils/dom.js';
import { LOTTO } from '../utils/constants.js';
import { mod, divide } from '../utils/common.js';
import { GUIDE_MESSAGE } from '../utils/message.js';
import LottoManager from '../model/LottoManager.js';
import { lottoManager } from './App.js';

export default class LottoPurchaseInput {
  constructor(props) {
    this.props = props;

    this.setup();
    this.selectDOM();
    this.bindEvent();
  }

  setup() {
    lottoManager.subscribe(this.clear.bind(this));
  }

  clear() {
    if (lottoManager.lottos.length === 0) {
      clearInputValue(this.$purchaseInput);
      this.$purchaseInput.disabled = false;
      this.$purchaseButton.disabled = true;
    }
  }

  selectDOM() {
    this.$lottoPurchaseInputContainer = $('#lotto-purchase-input-container');
    this.$purchaseInput = $('#lotto-purchase-input');
    this.$purchaseButton = $('#lotto-purchase-btn');
    this.$purchaseInputMessage = $('[data-section=purchaseInputMessage]');
  }

  bindEvent() {
    this.$purchaseButton.addEventListener('click', this.onPurchaseLotto);

    this.$purchaseInput.addEventListener(
      'keyup',
      this.onChangeInput.bind(this),
    );

    this.$lottoPurchaseInputContainer.addEventListener(
      'submit',
      this.onSubmit.bind(this),
    );
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.$purchaseButton.disabled) return;
    this.onPurchaseLotto();
    this.$purchaseInputMessage.textContent = '';
  }

  onChangeInput(e) {
    const [text, result] = LottoManager.validatePurchaseInputValue(
      e.target.value,
    );
    this.$purchaseInputMessage.textContent = text;
    if (result === 'success') {
      this.$purchaseInputMessage.style.color = 'green';
      this.$purchaseButton.disabled = false;
    } else if (result === 'error') {
      this.$purchaseInputMessage.style.color = 'red';
      this.$purchaseButton.disabled = true;
    }
  }

  onPurchaseLotto() {
    const purchaseInputValue = this.$purchaseInput.value;
    const payment = Number(purchaseInputValue);

    const lottoCount = divide(payment, LOTTO.PRICE);
    const remainingMoney = mod(payment, LOTTO.PRICE);
    alert(GUIDE_MESSAGE.PAYMENT_RESULT_MESSAGE(lottoCount, remainingMoney));
    this.$purchaseInput.disabled = true;
    this.$purchaseButton.disabled = true;
    lottoManager.createLottos(lottoCount);
  }
}

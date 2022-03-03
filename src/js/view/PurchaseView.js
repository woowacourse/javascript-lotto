import EVENT from '../constants/event.js';
import ID from '../constants/dom.js';
import { on, emit } from '../utils/event.js';
import { $ } from '../utils/selector.js';

export default class PurchaseView {
  constructor() {
    this.$purchaseForm = $(ID.PURCHASE_FORM);
    this.$purchaseInput = $(ID.PURCHASE_INPUT);
    this.$purchaseButton = $(ID.PURCHASE_BUTTON);
    this.$purchaseInputReset = $(ID.PURCHASE_INPUT_RESET);
    this.$purchasableLottoCount = $(ID.PURCHASABLE_LOTTO_COUNT);
    this.$purchasableLottoDiv = $(ID.PURCHASABLE_LOTTO_DIV);
    this.#bindEvents();
  }

  #bindEvents() {
    on(this.$purchaseForm, 'submit', (e) => this.#handleSubmit(e));

    on(this.$purchaseInput, 'keyup', (e) => this.#handleKeyup(e));
  }

  #handleSubmit(e) {
    e.preventDefault();
    const money = this.#getMoneyToPurchase();
    emit(this.$purchaseForm, EVENT.SUBMIT_PURCHASE, { money });
  }

  #getMoneyToPurchase() {
    return parseInt(this.$purchaseInput.value.replace(/,/g, ''), 10);
  }

  #handleKeyup(e) {
    e.preventDefault();
    const { target } = e;
    emit(this.$purchaseInput, EVENT.PURCHASE_KEYUP, { target });
  }

  stopInputTyping(value) {
    this.#convertWonUnitFormat(value.toString().substr(0, 6));
  }

  #convertWonUnitFormat(value) {
    this.$purchaseInput.value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  deactivatePurchaseForm() {
    this.$purchaseButton.disabled = true;
    this.$purchaseInput.disabled = true;
  }

  activatePurchaseForm() {
    this.$purchaseButton.disabled = false;
    this.$purchaseInput.disabled = false;
  }

  resetInput() {
    this.$purchaseInputReset.click();
  }

  renderPurchasableLottoCount(count = 0) {
    const lottoCount = Number.isNaN(count) ? 0 : count;
    this.$purchasableLottoCount.textContent = lottoCount;
  }

  hidePurchasableLottoCount() {
    this.$purchasableLottoDiv.classList.add('hidden');
  }
}

import EVENT from '../constants/event.js';
import ID from '../constants/selector.js';
import { on, emit } from '../utils/event.js';
import { $ } from '../utils/selector.js';

/**
 * @module view/PurchaseView
 */

/**
 * @class module:view/PurchaseView.PurchaseView
 * @classdesc 로또를 구입하는 섹션 화면을 담당하는 view 클래스
 */
export default class PurchaseView {
  constructor(lottoBundle) {
    this.lottoBundle = lottoBundle;
    this.$purchaseForm = $(ID.PURCHASE_FORM);
    this.$purchaseInput = $(ID.PURCHASE_INPUT);
    this.$purchaseButton = $(ID.PURCHASE_BUTTON);
    this.$purchaseInputReset = $(ID.PURCHASE_INPUT_RESET);
    this.$purchasableLottoCount = $(ID.PURCHASABLE_LOTTO_COUNT);
    this.$purchasableLottoDiv = $(ID.PURCHASABLE_LOTTO_DIV);
    this.#bindEvents();
  }

  /** @method bindEvents
   * @description 해당 뷰의 엘리먼트에서 발생하는 이벤트를 바인딩한다.
   */
  #bindEvents() {
    on(this.$purchaseForm, 'submit', (e) => this.#handleSubmit(e));

    on(this.$purchaseInput, 'keyup', (e) => this.#handleKeyup(e));
  }

  /** @method handleSubmit
   * @description 로또 구입 폼 submit 시 '@submit' 커스텀 이벤트를 emit한다.
   */
  #handleSubmit(e) {
    e.preventDefault();
    const money = this.#getMoneyToPurchase();
    emit(this.$purchaseForm, EVENT.SUBMIT_PURCHASE, { money });
  }

  /** @method getMoneyToPurchase
   * @returns {number} 로또 구매 금액
   * @description 입력된 로또 구매 금액을 반환한다.
   */
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

  /**
   * @description 로또 구입 폼을 비활성화한다.
   */
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

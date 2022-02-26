import EVENT from '../constants/event.js';
import LOTTO from '../constants/lotto.js';
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
  constructor(model) {
    this.model = model;
    this.$purchaseForm = $(ID.PURCHASE_FORM);
    this.$purchaseInput = $(ID.PURCHASE_INPUT);
    this.$purchaseButton = $(ID.PURCHASE_BUTTON);
    this.#bindEvents();
  }

  /** @method bindEvents
   * @description 해당 뷰의 엘리먼트에서 발생하는 이벤트를 바인딩한다.
   */
  #bindEvents() {
    on(this.$purchaseForm, 'submit', (e) => this.#handleSubmit(e));
  }

  /** @method handleSubmit
   * @description 로또 구입 폼 submit 시 '@submit' 커스텀 이벤트를 emit한다.
   */
  #handleSubmit(e) {
    e.preventDefault();
    const money = this.#getMoneyToPurchase();
    emit(this.$purchaseForm, EVENT.SUBMIT, { money });
  }

  /** @method getMoneyToPurchase
   * @returns {number} 로또 구매 금액
   * @description 입력된 로또 구매 금액을 반환한다.
   */
  #getMoneyToPurchase() {
    return this.$purchaseInput.valueAsNumber;
  }

  /**
   * @description 로또 구입 폼을 비활성화한다.
   */
  deactivatePurchaseForm() {
    this.$purchaseButton.disabled = true;
    this.$purchaseInput.disabled = true;
  }

  renderPenny() {
    this.$purchaseInput.valueAsNumber =
      this.model.money - this.model.count * LOTTO.PRICE_PER_TICKET;
  }
}

import { $ } from '../utils/util';
import { MAX_NUMBER_PURCHASE } from '../constants/constants';

import { lottoListTemplate, lottoTotalNumber } from './template';

const CLASS_DISPLAY_NONE = 'display-none';

export default class PurchaseTicketSectionView {
  constructor(app) {
    this.app = app;
    this.purchaseTicketSection = $('#purchase-ticket-section', this.app);
    this.chargeSubmitForm = $('#charge-submit-form', this.purchaseTicketSection);
    this.chargeInput = $('input', this.chargeSubmitForm);
    this.chargeSubmitButton = $('button', this.chargeSubmitForm);
    this.ticketListStyleToggleContainer = $('#show-number-toggle-container', this.purchaseTicketSection);
    this.ticketListStyleToggleInput = $('#show-number-toggle-input', this.ticketListStyleToggleContainer);
    this.totalPurchasedTicketNumber = $('#lotto-total-number', this.purchaseTicketSection);
    this.ticketListIcon = $('#lotto-list-icon', this.purchaseTicketSection);
    this.ticketListNumber = $('#lotto-list-number', this.purchaseTicketSection);

    this.bindEvent();
  }
  
  initialize(tickets) {
    this.chargeInput.value = '';
    this.updateLottoList(tickets);
    this.changeTicketListStyleToggleVisibility();
    this.activateChargeSubmitForm();
  }

  bindEvent() {
    this.chargeInput.addEventListener('keyup', this.onTypeCharge.bind(this));
    this.chargeSubmitForm.addEventListener('submit', this.onSubmitCharge.bind(this));
    this.ticketListStyleToggleInput.addEventListener('click', this.onClickTicketListStyleToggleInput.bind(this));
  }

  onTypeCharge(event) {
    if (Number(event.target.value) === 0)
      event.target.value = '';
  }

  onSubmitCharge(event) {
    event.preventDefault();
    const chargeInputValue = Number(this.chargeInput.value);
    const purchaseEvent = new CustomEvent('purchaseTicket', {
      detail: { chargeInputValue }
    });
    this.app.dispatchEvent(purchaseEvent);
  }

  onClickTicketListStyleToggleInput() {
    this.changeLottoIconListVisibility();
    this.changeLottoNumberListVisibility();
  }

  updateOnPurchase(tickets, charge) {
    if (tickets.length === MAX_NUMBER_PURCHASE)
      this.disableChargeSubmitForm();
    if (tickets.length !== 0 && this.isInvisibleTicketListStyleToggle())
      this.changeTicketListStyleToggleVisibility();

    this.updateLottoList(tickets);
    this.chargeInput.value = charge || '';
  }

  updateLottoList(tickets) {
    this.totalPurchasedTicketNumber.innerHTML = lottoTotalNumber(tickets.length);
    this.ticketListIcon.innerHTML = lottoListTemplate.icon(tickets.length);
    this.ticketListNumber.innerHTML = lottoListTemplate.number(tickets);
  }

  isInvisibleTicketListStyleToggle() {
    return this.ticketListStyleToggleContainer.classList.contains(CLASS_DISPLAY_NONE);
  }

  changeTicketListStyleToggleVisibility() {
    return this.ticketListStyleToggleContainer.classList.contains(CLASS_DISPLAY_NONE)
      ? this.ticketListStyleToggleContainer.classList.remove(CLASS_DISPLAY_NONE)
      : this.ticketListStyleToggleContainer.classList.add(CLASS_DISPLAY_NONE);
  }

  activateChargeSubmitForm() {
    this.chargeInput.removeAttribute('disabled');
    this.chargeSubmitButton.removeAttribute('disabled');
  }

  disableChargeSubmitForm() {
    this.chargeInput.setAttribute('disabled', '');
    this.chargeSubmitButton.setAttribute('disabled', '');
  }

  changeLottoIconListVisibility() {
    return this.ticketListIcon.classList.contains(CLASS_DISPLAY_NONE)
      ? this.ticketListIcon.classList.remove(CLASS_DISPLAY_NONE)
      : this.ticketListIcon.classList.add(CLASS_DISPLAY_NONE);
  }

  changeLottoNumberListVisibility() {
    return this.ticketListNumber.classList.contains(CLASS_DISPLAY_NONE)
      ? this.ticketListNumber.classList.remove(CLASS_DISPLAY_NONE)
      : this.ticketListNumber.classList.add(CLASS_DISPLAY_NONE);
  }
}

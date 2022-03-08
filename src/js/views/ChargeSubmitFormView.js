import { MAX_NUMBER_PURCHASE } from '../constants/constants';
import { $ } from '../utils/util';

export default class ChargeSubmitFormView {
  constructor(app) {
    this.app = app;
    this.purchaseTicketSection = $('#purchase-ticket-section', this.app);
    this.chargeSubmitForm = $('#charge-submit-form', this.purchaseTicketSection);
    this.chargeInput = $('input', this.chargeSubmitForm);
    this.chargeSubmitButton = $('button', this.chargeSubmitForm);

    this.bindEvent();
  }

  initialize() {
    this.chargeInput.value = '';
    this.activateChargeSubmitForm();
  }

  bindEvent() {
    this.chargeInput.addEventListener('keyup', this.onTypeCharge.bind(this));
    this.chargeSubmitForm.addEventListener('submit', this.onSubmitCharge.bind(this));
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

  updateOnPurchase(tickets, charge) {
    if (tickets.length === MAX_NUMBER_PURCHASE)
      this.disableChargeSubmitForm();
    this.chargeInput.value = charge || '';
  }

  activateChargeSubmitForm() {
    this.chargeInput.removeAttribute('disabled');
    this.chargeSubmitButton.removeAttribute('disabled');
  }

  disableChargeSubmitForm() {
    this.chargeInput.setAttribute('disabled', '');
    this.chargeSubmitButton.setAttribute('disabled', '');
  }
  
}


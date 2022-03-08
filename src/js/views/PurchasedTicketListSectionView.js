import { $ } from '../utils/util';

import { lottoListTemplate, lottoTotalNumber } from './template';

const CLASS_DISPLAY_NONE = 'display-none';

export default class PurchasedTicketListSectionView {
  constructor(app) {
    this.app = app;
    this.purchaseTicketSection = $('#purchase-ticket-section', this.app);
    this.ticketListStyleToggleContainer = $('#show-number-toggle-container', this.purchaseTicketSection);
    this.ticketListStyleToggleInput = $('#show-number-toggle-input', this.ticketListStyleToggleContainer);
    this.totalPurchasedTicketNumber = $('#lotto-total-number', this.purchaseTicketSection);
    this.ticketListIcon = $('#lotto-list-icon', this.purchaseTicketSection);
    this.ticketListNumber = $('#lotto-list-number', this.purchaseTicketSection);

    this.bindEvent();
  }
  
  initialize(tickets) {
    this.updateLottoList(tickets);
    this.changeTicketListStyleToggleVisibility();
  }

  bindEvent() {
    this.ticketListStyleToggleInput.addEventListener('click', this.onClickTicketListStyleToggleInput.bind(this));
  }

  onClickTicketListStyleToggleInput() {
    this.changeLottoIconListVisibility();
    this.changeLottoNumberListVisibility();
  }

  updateOnPurchase(tickets) {
    if (tickets.length !== 0 && this.isInvisibleTicketListStyleToggle())
      this.changeTicketListStyleToggleVisibility();
    this.updateLottoList(tickets);
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

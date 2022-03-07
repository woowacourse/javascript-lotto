import ticketTemplate from '../layouts/template.js';
import { emit, on } from '../utils/event.js';
import { $, $$ } from '../utils/selector.js';
import { ID } from '../constants/selector.js';
import CUSTOM_EVENT from '../constants/event.js';

export default class IssuedTicketView {
  constructor() {
    this.$ticketContainer = $(ID.TICKET_CONTAINER);
    this.$ticketCount = $(ID.TICKET_COUNT);
    this.$issuedTicketDiv = $(ID.ISSUED_TICKET_DIV);
    this.$lottoNumberToggle = $(ID.LOTTO_NUMBER_TOGGLE);
    this.bindEvents();
  }

  bindEvents() {
    on(this.$lottoNumberToggle, 'click', (e) => this.handleToggle(e));
  }

  handleToggle(e) {
    const { checked } = e.target;

    emit(this.$lottoNumberToggle, CUSTOM_EVENT.TOGGLE, { checked });
  }

  getMoneyToPurchase() {
    return this.$purchaseInput.valueAsNumber;
  }

  showTicketContainer() {
    this.$ticketContainer.classList.replace('hidden', 'show');
  }

  hideTicketContainer() {
    this.$ticketContainer.classList.replace('show', 'hidden');
  }

  rerenderView() {
    this.$issuedTicketDiv.textContent = '';
    this.$lottoNumberToggle.checked = false;
    this.hideTicketDetails();
    this.hideTicketContainer();
  }

  renderTicketCount(count) {
    this.$ticketCount.textContent = count;
  }

  renderIssuedTickets(lottos) {
    this.$issuedTicketDiv.insertAdjacentHTML(
      'beforeend',
      lottos.map((lotto) => ticketTemplate(lotto.numbers)).join(''),
    );
  }

  showTicketDetails() {
    this.$issuedTicketDiv.classList.remove('align-row');
    $$('.ticket-numbers').forEach((ticketContainer) => {
      ticketContainer.classList.remove('hidden');
    });
  }

  hideTicketDetails() {
    this.$issuedTicketDiv.classList.add('align-row');
    $$('.ticket-numbers').forEach((ticketContainer) => {
      ticketContainer.classList.add('hidden');
    });
  }
}

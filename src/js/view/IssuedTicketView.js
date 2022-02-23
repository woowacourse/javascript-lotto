import ticketTemplate from '../layouts/template.js';
import { emit, on } from '../utils/event.js';
import { $, $$ } from '../utils/selector.js';

export default class IssuedTicketView {
  constructor() {
    this.$ticketContainer = $('#ticket-container');
    this.$ticketCount = $('#ticket-count');
    this.$issuedTicketContainer = $('#issued-ticket-container');
    this.$lottoNumberToggle = $('#lotto-number-toggle');
    this.bindEvents();
  }

  bindEvents() {
    on(this.$lottoNumberToggle, 'click', (e) => this.handleToggle(e));
  }

  handleToggle(e) {
    const { checked } = e.target;
    emit(this.$lottoNumberToggle, '@toggle', { checked });
  }

  getMoneyToPurchase() {
    return this.$purchaseInput.valueAsNumber;
  }

  renderTicketContainer() {
    this.$ticketContainer.classList.remove('hidden');
    this.$ticketContainer.classList.add('show');
  }

  renderTicketCount(count) {
    this.$ticketCount.textContent = count;
  }

  renderTicketIcon(lottos) {
    let template = '';

    lottos.forEach((lotto) => {
      template += ticketTemplate(lotto.numbers);
    });

    this.$issuedTicketContainer.insertAdjacentHTML('beforeend', template);
  }

  showTicketDetails() {
    this.$issuedTicketContainer.classList.remove('align-row');
    $$('.ticket-numbers').forEach((ticketContainer) => {
      ticketContainer.classList.remove('hidden');
    });
  }

  hideTicketDetails() {
    this.$issuedTicketContainer.classList.add('align-row');
    $$('.ticket-numbers').forEach((ticketContainer) => {
      ticketContainer.classList.add('hidden');
    });
  }
}

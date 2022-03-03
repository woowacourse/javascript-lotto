import ticketTemplate from '../layouts/template.js';
import { emit, on } from '../utils/event.js';
import { $, $$ } from '../utils/selector.js';
import ID from '../constants/dom.js';
import EVENT from '../constants/event.js';

export default class IssuedTicketView {
  constructor() {
    this.$ticketContainer = $(ID.TICKET_CONTAINER);
    this.$ticketCount = $(ID.TICKET_COUNT);
    this.$issuedTicketDiv = $(ID.ISSUED_TICKET_DIV);
    this.$lottoNumberToggle = $(ID.LOTTO_NUMBER_TOGGLE);
    this.#bindEvents();
  }

  #bindEvents() {
    on(this.$lottoNumberToggle, 'click', (e) => this.#handleToggle(e));
  }

  #handleToggle(e) {
    const { checked } = e.target;
    emit(this.$lottoNumberToggle, EVENT.TOGGLE_LOTTO_DETAIL, { checked });
  }

  showTicketContainer() {
    this.$ticketContainer.classList.replace('hidden', 'grid');
  }

  hideTicketContainer() {
    this.$issuedTicketDiv.textContent = '';
    this.$issuedTicketDiv.classList.add('align-row');
    this.$ticketContainer.classList.replace('grid', 'hidden');
  }

  renderTicketCount(count) {
    this.$ticketCount.textContent = count;
  }

  renderIssuedTickets(issuedLottos) {
    const template = issuedLottos.map((lotto) => ticketTemplate(lotto.numbers)).join('');
    this.$issuedTicketDiv.insertAdjacentHTML('beforeend', template);
  }

  toggleTicketDetails() {
    this.$issuedTicketDiv.classList.toggle('align-row');
    $$('.ticket-numbers').forEach((ticketContainer) => {
      ticketContainer.classList.toggle('hidden');
    });
  }

  highlightWinningTickets(resultList) {
    resultList.forEach((result, index) => {
      $$('.ticket-numbers')[index].dataset.rank = result;
    });
  }
}

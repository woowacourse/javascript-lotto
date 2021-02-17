import { LOTTO_NUMBER_SEPARATOR, PURCHASED_QUANTITY_MESSAGE } from '../constants.js';
import { $, $$ } from '../utils/DOM.js';

export default class PurchasedLotto {
  constructor({ lottoTickets }) {
    this.$purchasedLottoSection = $('.purchased-lotto-section');
    this.$lottoTicketContainer = $('.lotto-ticket-container');
    this.$purchasedLottoLabel = $('.purchased-lotto-label');
    this.lottoTickets = lottoTickets;

    this.attachEvents();
    this.render();
  }

  attachEvents() {
    $('.switch').addEventListener('click', this.onToggleShowingNumbers.bind(this));
  }

  onToggleShowingNumbers({ target }) {
    if (target.type === 'checkbox') {
      target.checked ? this.showNumbers() : this.hideNumbers();
    }
  }

  showNumbers() {
    this.$lottoTicketContainer.classList.add('flex-col');
    $$('.lotto-numbers').forEach(($lottoNumbers) => $lottoNumbers.classList.remove('d-none'));
  }

  hideNumbers() {
    this.$lottoTicketContainer.classList.remove('flex-col');
    $$('.lotto-numbers').forEach(($lottoNumbers) => $lottoNumbers.classList.add('d-none'));
  }

  createLottoTicketHTML(lottoTicket) {
    return `
    <li class="mx-1 text-4xl d-flex items-center">
      🎟️
      <span class="text-xl ml-5 d-none lotto-numbers">
        ${lottoTicket.numbers.join(LOTTO_NUMBER_SEPARATOR)}
      </span>
    </li>`;
  }

  render() {
    const numOfLotto = this.lottoTickets.length;

    if (!numOfLotto) {
      return;
    }

    this.$purchasedLottoSection.classList.remove('d-none');
    this.$purchasedLottoLabel.innerHTML = PURCHASED_QUANTITY_MESSAGE(numOfLotto);
    this.$lottoTicketContainer.innerHTML = this.lottoTickets.map(this.createLottoTicketHTML).join('');
  }

  setState({ lottoTickets }) {
    this.lottoTickets = lottoTickets;
    this.render();
  }
}

import { LOTTO_PRICE, RATE_OF_RETURN_DECIMAL_PLACE, WINNING_PRIZE } from '../constants.js';
import { $ } from '../utils/DOM.js';

export default class ResultModal {
  constructor({ isVisible, lottoTickets, winningNumber }) {
    this.$modal = $('.modal');
    this.$modalClose = $('.modal-close');

    this.isVisible = isVisible;
    this.lottoTickets = lottoTickets;
    this.winningNumber = winningNumber;
  }

  attachEvents() {
    this.$modalClose.addEventListener('click', this.onCloseModal.bind(this));
  }

  onCloseModal() {
    this.setState({ isVisible: false });
  }

  getRateOfReturn() {
    const profit = this.lottoTickets.reduce(
      (acc, lottoTicket) => acc + WINNING_PRIZE[lottoTicket.getTotalMatchCount(this.winningNumber)],
      0
    );
    const loss = this.lottoTickets.length * LOTTO_PRICE;
    const rateOfReturn = ((profit - loss) / loss) * 100;

    return rateOfReturn % 1 !== 0 ? Number(rateOfReturn.toFixed(RATE_OF_RETURN_DECIMAL_PLACE)) : rateOfReturn;
  }

  setState({ isVisible }) {
    if (typeof isVisible === 'boolean') {
      this.isVisible = isVisible;
      this.renderModal();
    }
  }

  renderModal() {
    this.isVisible ? this.$modal.classList.add('open') : this.$modal.classList.remove('open');
  }
}

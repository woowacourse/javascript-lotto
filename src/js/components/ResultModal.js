import {
  LOTTO_PRICE,
  RATE_OF_RETURN_DECIMAL_PLACE,
  RENDER_ORDER_KEY,
  RATE_OF_RETURN_MESSAGE,
  WINNING_PRIZE,
} from '../constants.js';
import { $ } from '../utils/DOM.js';
import { getRateOfReturn } from '../utils/general.js';

export default class ResultModal {
  constructor({ isVisible, lottoTickets, winningNumber }) {
    this.$modal = $('.modal');
    this.$modalClose = $('.modal-close');
    this.$resultTableBody = $('.result-table-body');
    this.$rateOfReturn = $('.rate-of-return');

    this.isVisible = isVisible;
    this.lottoTickets = lottoTickets;
    this.winningNumber = winningNumber;

    this.setTotalMatchCounts();
    this.attachEvents();
  }

  attachEvents() {
    this.$modalClose?.addEventListener('click', this.onCloseModal.bind(this));
  }

  onCloseModal() {
    this.setState({ isVisible: false });
  }

  getLottoRateOfReturn() {
    const profit = this.lottoTickets.reduce(
      (acc, lottoTicket) => acc + WINNING_PRIZE[lottoTicket.totalMatchCount].PRIZE,
      0
    );
    const loss = this.lottoTickets.length * LOTTO_PRICE;
    const rateOfReturn = getRateOfReturn(profit, loss);

    return rateOfReturn % 1 !== 0 ? Number(rateOfReturn.toFixed(RATE_OF_RETURN_DECIMAL_PLACE)) : rateOfReturn;
  }

  createTableBodyHTML() {
    return RENDER_ORDER_KEY.map((key) => {
      const { DESCRIPTION, PRIZE } = WINNING_PRIZE[key];

      return this.createTableRowHTML({
        DESCRIPTION,
        PRIZE,
        numOfWinningTicket: this.lottoTickets.filter((lottoTicket) => lottoTicket.totalMatchCount === key).length,
      });
    }).join('');
  }

  createTableRowHTML({ DESCRIPTION, PRIZE, numOfWinningTicket }) {
    return `
      <tr class="text-center">
        <td class="p-3">${DESCRIPTION}</td>
        <td class="p-3">${PRIZE.toLocaleString()}</td>
        <td class="p-3">${numOfWinningTicket}</td>
      </tr>`;
  }

  setTotalMatchCounts() {
    this.lottoTickets.forEach((lottoTicket) => lottoTicket.setTotalMatchCount(this.winningNumber));
  }

  setState({ isVisible, lottoTickets, winningNumber }) {
    this.isVisible = isVisible;

    if (lottoTickets && winningNumber) {
      this.lottoTickets = lottoTickets;
      this.winningNumber = winningNumber;
      this.setTotalMatchCounts();
    }

    this.render();
  }

  render() {
    if (!this.isVisible) {
      this.$modal.classList.remove('open');

      return;
    }

    this.$resultTableBody.innerHTML = this.createTableBodyHTML();
    this.$rateOfReturn.innerText = RATE_OF_RETURN_MESSAGE(this.getLottoRateOfReturn());
    this.$modal.classList.add('open');
  }
}

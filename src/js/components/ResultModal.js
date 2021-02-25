import { LOTTO_PRICE, RATE_OF_RETURN_DECIMAL_PLACE, RATE_OF_RETURN_MESSAGE, WINNING_PRIZE } from '../constants.js';
import { getRateOfReturn } from '../utils/general.js';
import { $ } from '../utils/DOM.js';

export default class ResultModal {
  constructor({ isVisible, lottoTickets, winningNumber, onRestart }) {
    this.$modal = $('.modal');
    this.$modalClose = $('.modal-close');
    this.$resultTableBody = $('.result-table-body');
    this.$rateOfReturn = $('.rate-of-return');
    this.$resetButton = $('.reset-button');

    this.isVisible = isVisible;
    this.lottoTickets = lottoTickets;
    this.winningNumber = winningNumber;

    this.onRestart = onRestart;

    this.setTotalMatchCounts();
    this.attachEvents();
  }

  attachEvents() {
    this.$modalClose?.addEventListener('click', this.closeModal.bind(this));
    this.$resetButton?.addEventListener('click', () => {
      this.onRestart();
      this.closeModal();
    });
  }

  showModal() {
    this.setState({ isVisible: true });
  }

  closeModal() {
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

  setTotalMatchCounts() {
    if (this.lottoTickets.length > 0 && Object.keys(this.winningNumber).length > 0) {
      this.lottoTickets.forEach((lottoTicket) => lottoTicket.setTotalMatchCount(this.winningNumber));
    }
  }

  setState({ isVisible, lottoTickets, winningNumber }) {
    this.isVisible = isVisible ?? this.isVisible;
    this.lottoTickets = lottoTickets ?? this.lottoTickets;
    this.winningNumber = winningNumber ?? this.winningNumber;

    this.setTotalMatchCounts();
    this.render();
  }

  createTableBodyHTML() {
    return Object.keys(WINNING_PRIZE)
      .sort((a, b) => a - b)
      .filter((key) => WINNING_PRIZE[key].DESCRIPTION !== undefined)
      .map((key) => {
        const { DESCRIPTION, PRIZE } = WINNING_PRIZE[key];

        return this.createTableRowHTML({
          DESCRIPTION,
          PRIZE,
          numOfWinningTicket: this.lottoTickets.filter((lottoTicket) => lottoTicket.totalMatchCount === key).length,
        });
      })
      .join('');
  }

  createTableRowHTML({ DESCRIPTION, PRIZE, numOfWinningTicket }) {
    return `
      <tr class="text-center">
        <td class="p-3">${DESCRIPTION}</td>
        <td class="p-3">${PRIZE.toLocaleString()}</td>
        <td class="p-3">${numOfWinningTicket}</td>
      </tr>`;
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

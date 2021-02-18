import Ticket from './Ticket.js';

export default function Lotto() {
  const init = () => {
    this.tickets = [];
    this.winningNumbers = [];
    this.bonusNumber;
  };

  this.getTicket = () => {
    this.tickets.push(new Ticket());
  };

  this.putLottoTickets = () => {
    return this.tickets.map((ticket) => ticket.numbers);
  };

  init();
}

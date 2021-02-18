import Ticket from './Ticket.js';

export default function Lotto() {
  const init = () => {
    this.tickets = [];
    this.winningNumber = [];
  };

  this.getTicket = () => {
    this.tickets.push(new Ticket());
  };

  this.putLottoNumbers = () => {
    return this.tickets.map((ticket) => ticket.numbers);
  };

  init();
}

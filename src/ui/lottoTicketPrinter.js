import { querySelector } from "../util/DOMSelector";

export const lottoTicket = (number) => {
  return `<li class="ticket-numbers"><span class="ticket-emoji">🎟️</span>${number}</li>`;
};

export const printLottoTicket = (lottoTickets) => {
  const lottoTicketList = querySelector("#lotto-tickets");
  lottoTicketList.innerHTML = lottoTickets.map((ticket) => lottoTicket(ticket)).join("");
};

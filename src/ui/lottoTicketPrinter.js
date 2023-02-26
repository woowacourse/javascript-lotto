const lottoTicketList = document.querySelector("#lotto-tickets");

export const lottoTicket = (number) => {
  return `<li class="ticket-numbers"><span class="ticket-emoji">🎟️</span>${number}</li>`;
};

export const printLottoTicket = (lottoTickets) => {
  lottoTicketList.innerHTML = lottoTickets.map((ticket) => lottoTicket(ticket)).join("");
};

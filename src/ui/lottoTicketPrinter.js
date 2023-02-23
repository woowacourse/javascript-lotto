const lottoTicketList = document.querySelector(".lotto-tickets");

export const lottoTicket = (number) => {
  return `<ul class="lotto-ticket">
<li class="ticket-emoji">🎟️</li>
<li class="ticket-numbers">${number}</li>
</ul>`;
};

export const printLottoTicket = (lottoTickets) => {
  lottoTicketList.innerHTML = lottoTickets.map((ticket) => lottoTicket(ticket)).join("");
};

export default function LottoTickets() {
  const buyResultContainer = document.createElement('div');
  buyResultContainer.setAttribute('id', 'lottos');

  const purchaseTotalSpan = document.createElement('span');
  purchaseTotalSpan.classList.add('total-buy-text');
  purchaseTotalSpan.setAttribute('id', 'total-buy-text');

  const lottoTicketsContainer = document.createElement('section');
  lottoTicketsContainer.classList.add('lotto-tickets-container');

  const ticketsUl = document.createElement('ul');
  ticketsUl.setAttribute('id', 'ticket-list');
  ticketsUl.classList.add('ticket-list');
  lottoTicketsContainer.appendChild(ticketsUl);

  buyResultContainer.appendChild(purchaseTotalSpan);
  buyResultContainer.appendChild(lottoTicketsContainer);

  return buyResultContainer;
}

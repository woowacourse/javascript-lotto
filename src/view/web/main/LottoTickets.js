export default function LottoTickets() {
  const buyResultContainer = document.createElement('div');
  buyResultContainer.setAttribute('id', 'lottos');

  // 구매한 로또 개수
  const purchaseTotalSpan = document.createElement('span');
  purchaseTotalSpan.setAttribute('id', 'total-buy-text');

  // 로또 티켓
  const lottoTicketsContainer = document.createElement('section');
  lottoTicketsContainer.setAttribute('id', 'lotto-tickets-container');

  const ticketsUl = document.createElement('ul');
  lottoTicketsContainer.appendChild(ticketsUl);

  // 합치기
  buyResultContainer.appendChild(purchaseTotalSpan);
  buyResultContainer.appendChild(lottoTicketsContainer);

  return buyResultContainer;
}

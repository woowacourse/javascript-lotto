const LottoItem = {
  render(container, { lotto }) {
    const lottoItemContainer = document.createElement('div');
    const lottoTicketIcon = document.createElement('img');
    const lottoNumbersContainer = document.createElement('div');

    lottoItemContainer.id = 'lotto-item-container';
    lottoItemContainer.classList.add('lotto-item-container');

    lottoTicketIcon.src = '/ticket.png';
    lottoTicketIcon.alt = '';

    lottoNumbersContainer.innerText = lotto.parseNumbers().join(', ');

    lottoItemContainer.appendChild(lottoTicketIcon);
    lottoItemContainer.appendChild(lottoNumbersContainer);

    container.appendChild(lottoItemContainer);
  },
};

export default LottoItem;

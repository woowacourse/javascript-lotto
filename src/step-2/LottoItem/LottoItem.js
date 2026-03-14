const LottoItem = {
  render(container, { lotto }) {
    const lottoItemContainer = document.createElement('li');
    const lottoTicketIcon = document.createElement('img');
    const lottoNumbersContainer = document.createElement('div');
    
    lottoTicketIcon.src = '/ticket.png';
    lottoTicketIcon.alt = '';

    lottoNumbersContainer.innerText = lotto.parseNumbers().join(', ');

    lottoItemContainer.appendChild(lottoTicketIcon);
    lottoItemContainer.appendChild(lottoNumbersContainer);

    container.appendChild(lottoItemContainer);
  },
};

export default LottoItem;

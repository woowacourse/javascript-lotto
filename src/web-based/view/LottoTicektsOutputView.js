class LottoTicketsOutputView {
  lottoTicketsSectionView = document.querySelector('.section-lotto-ticket');
  lottoTicketsView = document.querySelector('.ul-lotto-tickets');
  lottoNumbersInputSectionView = document.querySelector('.section-submit-lotto-numbers');
  lottoCountView = document.querySelector('.text-lotto-count');

  displayLottoTicketsSection(lottoTickets) {
    this.lottoTicketsSectionView.classList.remove('invisible');
    this.lottoCountView.textContent = `총 ${lottoTickets.length}개를 구매하셨습니다.`;
    lottoTickets.forEach((ticket) => {
      this.lottoTicketsView.innerHTML += `
      <li class='li-lotto-ticket'>
        <p class='text-ticket-emoji'>🎟️</p>
        <p class='text-ticket-numbers'>${ticket.join(', ')}</p>
      <li>
      `;
    });
  }

  displayLottoNumbersInputSection() {
    this.lottoNumbersInputSectionView.classList.remove('invisible');
  }

  resetToInitialState() {
    this.lottoTicketsSectionView.classList.add('invisible');
    this.lottoTicketsView.innerHTML = '';
    this.lottoNumbersInputSectionView.classList.add('invisible');
  }
}

export default new LottoTicketsOutputView();

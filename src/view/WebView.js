import { $ } from '../util/querySelector';

const purchasedLottoTemplate = (lotto) => {
  return `
  <li>
    <span class="lotto-emoji">🎟️</span> <span class="lotto-numbers">${lotto.join(', ')}</span>
  </li>
  `;
};

const WebView = {
  addEventListenerModalClose() {
    $('#modal-close-button').addEventListener('click', () => WebView.hide('#modal'));
    $('.modal-overlay').addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-overlay')) WebView.hide('.modal-overlay');
    });
    window.addEventListener('keyup', (e) => {
      if (e.key === 'Escape' && !$('.modal-overlay').classList.contains('hidden'))
        WebView.hide('.modal-overlay');
    });
  },

  printLottoTicketCount(ticketCount) {
    $('#purchased-lotto-count').innerHTML = ticketCount;
  },

  printLottoTickets(lottoTickets) {
    while ($('#purchased-lotto-container').firstChild) {
      $('#purchased-lotto-container').removeChild($('#purchased-lotto-container').firstChild);
    }

    lottoTickets.forEach((lottoTicket) =>
      $('#purchased-lotto-container').insertAdjacentHTML(
        'beforeend',
        purchasedLottoTemplate(lottoTicket)
      )
    );
  },

  printLottoRanksResult(lottoRanksResult) {
    $('#modal').classList.remove('hidden');

    Object.entries(lottoRanksResult).forEach(([lottoRank, count]) => {
      $(`#result-${lottoRank}`).innerHTML = count;
    });
  },

  printProfitRate(profitRate) {
    $('#profit-rate-span').innerHTML = profitRate;
  },

  show(...elements) {
    elements.forEach((element) => $(element).classList.remove('hidden'));
  },

  hide(...elements) {
    elements.forEach((element) => $(element).classList.add('hidden'));
  },
};

export default WebView;

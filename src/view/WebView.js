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
    $('.close__btn').addEventListener('click', () => WebView.hide('.lotto__statistics__container'));
    $('.lotto__modal').addEventListener('click', (e) => {
      if (e.target.classList.contains('lotto__modal')) WebView.hide('.lotto__modal');
    });
    window.addEventListener('keyup', (e) => {
      if (e.key === 'Escape' && !$('.lotto__modal').classList.contains('hide'))
        WebView.hide('.lotto__modal');
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

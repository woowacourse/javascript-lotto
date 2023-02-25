import { $ } from '../util/querySelector';

const purchasedLottoTemplate = (lotto) => {
  return `
  <li>
    <span class="lotto-emoji">🎟️</span> <span class="lotto-numbers">${lotto.join(', ')}</span>
  </li>
  `;
};

const WebView = {
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

  showHiddenSection() {
    $('#winning-numbers-section').classList.remove('hidden');
    $('#purchased-lotto-section').classList.remove('hidden');
  },

  hideShowingSection() {
    $('#winning-numbers-section').classList.add('hidden');
    $('#purchased-lotto-section').classList.add('hidden');
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
};

export default WebView;

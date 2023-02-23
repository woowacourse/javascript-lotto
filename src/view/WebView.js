import { $ } from '../util/querySelector';

const WebView = {
  printLottoTicketCount(ticketCount) {
    $('#purchased-lotto-count').innerHTML = ticketCount;
  },
};

export default WebView;

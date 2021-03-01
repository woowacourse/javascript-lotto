import { lotto } from '../lib/state/lotto.js';
import { $ } from '../lib/utils/dom.js';
import { clearLottoApp, closeModal } from '../lib/viewController/app.js';

const lottoResetHandler = () => {
  lotto.setTickets([]);
  lotto.setIssuableTicketAmount(0);
  clearLottoApp();
  closeModal($('#result-modal'));
};

export default lottoResetHandler;

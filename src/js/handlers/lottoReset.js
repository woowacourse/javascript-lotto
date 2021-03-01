import { lotto } from '../lib/state/lotto.js';
import { clearLottoApp, closeModal } from '../lib/viewController/app.js';

const lottoResetHandler = () => {
  lotto.setTickets([]);
  clearLottoApp();
  closeModal($('result-modal'));
};

export default lottoResetHandler;

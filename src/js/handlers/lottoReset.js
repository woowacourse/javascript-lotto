import { lotto } from '../lib/state/lotto.js';
import { closeModal } from '../lib/viewController/modal.js';
import { clearLottoApp } from '../lib/viewController/app.js';

const lottoResetHandler = () => {
  lotto.setTickets([]);
  clearLottoApp();
  closeModal();
};

export default lottoResetHandler;

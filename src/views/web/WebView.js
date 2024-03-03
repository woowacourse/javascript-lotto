import { MODAL_SELECTOR } from './components/Modal';
import { PAYEMENT_FORM_SELECTOR } from './components/PaymentForm';
import { PURCHASED_LOTTOS_SELECTOR } from './components/PurchasedLottos';
import { STATISTICS_SELECTOR } from './components/Statistics';
import { WINNINT_LOTTO_SELECTOR } from './components/WinningLottoForm';

class WebView {
  paymentForm;

  winningLottoForm;

  purchasedLottos;

  statistics;

  modal;

  constructor() {
    this.paymentForm = document.querySelector(PAYEMENT_FORM_SELECTOR);
    this.winningLottoForm = document.querySelector(WINNINT_LOTTO_SELECTOR);
    this.purchasedLottos = document.querySelector(PURCHASED_LOTTOS_SELECTOR);
    this.statistics = document.querySelector(STATISTICS_SELECTOR);
    this.modal = document.querySelector(MODAL_SELECTOR);
  }

  clearViews() {
    this.modal.closeModal();

    this.paymentForm.clear();
    this.winningLottoForm.clear();
    this.purchasedLottos.clear();
    this.statistics.clear();
  }

  updatePurchasedLottos(lottoTickets) {
    this.purchasedLottos.lottos = lottoTickets;
  }

  displayWinningLottoForm() {
    this.winningLottoForm.displayForm();
  }
}

export default WebView;

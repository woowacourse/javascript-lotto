import { MODAL_SELECTOR } from './components/Modal';
import { PAYEMENT_FORM_SELECTOR } from './components/PaymentForm';
import { PURCHASED_LOTTOS_SELECTOR } from './components/PurchasedLottos';
import { WINNINT_LOTTO_SELECTOR } from './components/WinningLottoForm';

class WebView {
  paymentForm;

  winningLottoForm;

  purchasedLottos;

  modal;

  constructor() {
    this.paymentForm = document.querySelector(PAYEMENT_FORM_SELECTOR);
    this.winningLottoForm = document.querySelector(WINNINT_LOTTO_SELECTOR);
    this.purchasedLottos = document.querySelector(PURCHASED_LOTTOS_SELECTOR);
    this.modal = document.querySelector(MODAL_SELECTOR);
  }

  updatePurchasedLottos(lottoTickets) {
    this.purchasedLottos.setAttribute('data-lottos', JSON.stringify(lottoTickets));
  }

  displayWinningLottoForm() {
    this.winningLottoForm.displayForm();
  }
}

export default WebView;

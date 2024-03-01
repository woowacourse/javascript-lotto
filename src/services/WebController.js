import { PAYMENT_FORM_EVENTS } from '../components/PaymentForm';

class WebController {
  #lottoGame;

  #webView;

  constructor(lottoGame, webView) {
    this.#lottoGame = lottoGame;
    this.#webView = webView;
    this.#init();
  }

  #init() {
    document.addEventListener('DOMContentLoaded', this.#addEventListeners.bind(this));
  }

  #addEventListeners() {
    this.#webView.paymentForm.addEventListener(PAYMENT_FORM_EVENTS.submit, this.#handlePaymentFormSubmit.bind(this));
  }

  async #handlePaymentFormSubmit(event) {
    const { target } = event;
    const paymentAmount = target.elements.paymentAmount.value;

    try {
      await this.#getPaid(paymentAmount);
    } catch (error) {
      this.#webView.paymentForm.displayErrorMessage(error.message);
    }
  }

  async #getPaid(paymentAmount) {
    this.#lottoGame.insertMoney(paymentAmount);

    this.#webView.paymentForm.displayErrorMessage('');

    this.#webView.updatePurchasedLottos(this.#lottoGame.lottoTickets);
    this.#webView.clearPaymentForm();
  }
}

export default WebController;

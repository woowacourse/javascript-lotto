import { LottoGame } from '../domains';
import WebView from '../views/web/WebView';
import { PAYMENT_FORM_EVENTS } from '../views/web/components/PaymentForm';
import { WINNING_LOTTO_EVENTS } from '../views/web/components/WinningLottoForm';

class WebController {
  #lottoGame;

  #webView;

  constructor() {
    this.#lottoGame = new LottoGame();
    this.#webView = new WebView();
    this.#init();
  }

  #init() {
    document.addEventListener('DOMContentLoaded', this.#addEventListeners.bind(this));
  }

  #addEventListeners() {
    this.#webView.paymentForm.addEventListener(PAYMENT_FORM_EVENTS.submit, this.#handlePaymentFormSubmit.bind(this));
    this.#webView.winningLottoForm.addEventListener(
      WINNING_LOTTO_EVENTS.submit,
      this.#handleWinningLottoFormSubmit.bind(this),
    );
  }

  async #handlePaymentFormSubmit(event) {
    try {
      await this.#getPaid(event.detail);
      this.#webView.paymentForm.disableForm();
    } catch (error) {
      this.#webView.paymentForm.displayErrorMessage(error.message);
    }
  }

  async #getPaid({ paymentAmount }) {
    this.#lottoGame.insertMoney(paymentAmount);

    this.#webView.paymentForm.clearErrorMessage();

    this.#webView.updatePurchasedLottos(this.#lottoGame.lottoTickets);
    this.#webView.displayWinningLottoForm();
  }

  async #handleWinningLottoFormSubmit(event) {
    try {
      await this.#getWinningLotto(event.detail);
    } catch (error) {
      this.#webView.winningLottoForm.displayErrorMessage(error.message);
    }
  }

  async #getWinningLotto({ winningNumbers, bonusNumber }) {
    this.#lottoGame.issueWinningLotto(winningNumbers.join(','), bonusNumber);

    this.#webView.winningLottoForm.clearErrorMessage();
  }
}

export default WebController;

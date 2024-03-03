import { LottoGame } from '../domains';
import WebView from '../views/web/WebView';
import { PAYMENT_FORM_EVENTS } from '../views/web/components/PaymentForm';
import { STATISTICS_EVENTS } from '../views/web/components/Statistics';
import { WINNING_LOTTO_EVENTS } from '../views/web/components/WinningLottoForm';

// TODO: this.#webView에서 직접 접근하는 것들 추상화 해주기
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
    this.#webView.statistics.addEventListener(STATISTICS_EVENTS.restart, this.#handleRestart.bind(this));
  }

  async #handlePaymentFormSubmit(event) {
    try {
      await this.#getPaid(event.detail);
      this.#webView.paymentForm.disableForm();
      this.#webView.winningLottoForm.querySelector('.lotto-number-input').focus();
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
      this.#webView.modal.openModal();
      this.#webView.statistics.lottoAnalytics = this.#lottoGame.lottoAnalytics;
    } catch (error) {
      this.#webView.winningLottoForm.displayErrorMessage(error.message);
    }
  }

  async #getWinningLotto({ winningNumbers, bonusNumber }) {
    this.#lottoGame.issueWinningLotto(winningNumbers.join(','), bonusNumber);
    this.#lottoGame.calculateStatistics();

    this.#webView.winningLottoForm.clearErrorMessage();
  }

  async #handleRestart() {
    this.#lottoGame = new LottoGame();
    this.#webView = new WebView();
    this.#init();

    this.#webView.clearViews();
  }
}

export default WebController;

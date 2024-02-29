import { EVENTS } from '../components/PaymentForm';

class WebController {
  #lottoGame;

  #state = {
    lottos: [],
    paymentAmount: 0,
  };

  #paymentForm;

  #purchasedLottos;

  constructor(lottoGame, paymentFormSelector, purchasedLottosSelector) {
    this.#lottoGame = lottoGame;
    this.#paymentForm = document.querySelector(paymentFormSelector);
    this.#purchasedLottos = document.querySelector(purchasedLottosSelector);

    this.#init();
  }

  #init() {
    document.addEventListener('DOMContentLoaded', this.#addEventListeners.bind(this));
  }

  #addEventListeners() {
    this.#paymentForm.addEventListener(EVENTS.paymentFormSubmit, this.#handlePaymentFormSubmit.bind(this));
  }

  async #handlePaymentFormSubmit(event) {
    const { target } = event;
    const paymentAmount = target.elements.paymentAmount.value;

    try {
      await this.#getPaid(paymentAmount);
    } catch (error) {
      this.#handleError(error.message);
    }
  }

  async #getPaid(paymentAmount) {
    this.#lottoGame.insertMoney(paymentAmount);

    const errMsgNode = this.#paymentForm.querySelector('.err-msg');
    errMsgNode.innerHTML = '';

    this.#state.lottos = this.#lottoGame.lottoTickets;
    this.#updatePurchasedLottos();
  }

  #updatePurchasedLottos() {
    this.#purchasedLottos.setAttribute('data-lottos', JSON.stringify(this.#state.lottos));
  }

  #handleError(errorMessage) {
    const errMsgNode = this.#paymentForm.querySelector('.err-msg');
    errMsgNode.innerHTML = errorMessage;

    this.#paymentForm.elements.paymentAmount.value = '';
    this.#state.paymentAmount = '';
  }
}

export default WebController;

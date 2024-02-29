import { EVENTS } from '../components/PaymentForm';

class WebController {
  #lottoGame;

  #state = {
    lottos: [],
    paymentAmount: 0,
  };

  constructor(lottoGame) {
    this.#lottoGame = lottoGame;
    this.#init();
  }

  // 이벤트 리스너 등록
  #init() {
    document.addEventListener('DOMContentLoaded', () => {
      document.addEventListener(EVENTS.paymentFormSubmit, (event) => {
        const { target } = event;
        const invalidInputCallback = (error) => {
          if (!target.querySelector('.err-msg')) {
            target.appendChild(this.#createErrMsgElement(error.message));
          }
          target.querySelector('.err-msg').innerHTML = error.message;

          target.elements.paymentAmount.value = '';
          this.#state.paymentAmount = '';
        };

        this.#validateInput(() => this.#getPaid(event), invalidInputCallback);
      });
    });
  }

  #getPaid({ detail, target }) {
    if (target.querySelector('.err-msg')) {
      target.querySelector('.err-msg').remove();
    }

    this.#lottoGame.insertMoney(detail.paymentAmount);
    this.#state.paymentAmount = this.#lottoGame.paymentAmount;
    this.#state.lottos = this.#lottoGame.lottos;
  }

  #createErrMsgElement(errMsg) {
    const errMsgElement = document.createElement('p');
    errMsgElement.setAttribute('class', 'err-msg');
    errMsgElement.innerHTML = errMsg;

    return errMsgElement;
  }

  async #validateInput(action, errCallback) {
    try {
      await action();
    } catch (error) {
      errCallback(error);
    }
  }
}

export default WebController;

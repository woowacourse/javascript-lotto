import { EVENTS } from '../components/PaymentForm';

class WebController {
  #lottoGame;

  // TODO: state ~ 컴포넌트 필드 App으로 빼기
  #state = {
    lottos: [],
    paymentAmount: 0,
  };

  #paymentForm = document.forms.paymentAmount;

  #purchasedLotto = document.querySelector('#purchased-lottos-container');

  constructor(lottoGame) {
    this.#lottoGame = lottoGame;
    this.#init();
  }

  // 이벤트 리스너 등록
  #init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.#paymentForm.addEventListener(EVENTS.paymentFormSubmit, (event) => {
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

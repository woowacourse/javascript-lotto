import HtmlTextInjectorWithGameResults from './HtmlTextInjectorWithGameResults';
import {
  changeClassAboutGameStep,
  handleErrorMessage,
  recoveryInitialStateExceptPayment,
} from './utils';

class LottoMachineGenerator {
  #lottoResultsHelper;

  $paymentFormElement = document.querySelector('.payment-amount__form');

  /**
   *
   * @param {LottoResultHelper} lottoResultsHelper
   */
  constructor(lottoResultsHelper) {
    this.#lottoResultsHelper = lottoResultsHelper;
    this.#addEvent();
  }

  #addEvent() {
    this.$paymentFormElement.addEventListener('submit', (event) =>
      this.#handlePaymentAmountSubmit(event),
    );
  }

  /**
   * 구매 금액을 지출하면 유효성 검사를 통과하면 발행된 로또들을 화면에 출력하고 통과하지 못하면 오류 메세지를 화면에 출력한다.
   * @param {Event} event
   */
  #handlePaymentAmountSubmit(event) {
    event.preventDefault();
    recoveryInitialStateExceptPayment();
    const { currentTarget } = event;
    const paymentAmountInputEl = currentTarget.elements.paymentAmount;
    const { value } = paymentAmountInputEl;
    const errorMessageElement = document.querySelector(
      '.payment-amount .message-error',
    );

    try {
      this.#lottoResultsHelper.generateLottoMachine(value);

      HtmlTextInjectorWithGameResults.injectorLottoTickets(
        this.#lottoResultsHelper.lottoTickets,
      );

      changeClassAboutGameStep('winning');
      handleErrorMessage(errorMessageElement);
    } catch (error) {
      handleErrorMessage(errorMessageElement, error);
    }
  }
}

export default LottoMachineGenerator;

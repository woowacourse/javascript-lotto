import HtmlTextInjectorWithGameResults from './HtmlTextInjectorWithGameResults';
import { handleErrorMessage } from './utils';

class LottoMachineGenerator {
  #lottoResultsHelper;

  #btnPayLottoElement;

  /**
   *
   * @param {LottoResultHelper} lottoResultsHelper
   */
  constructor(lottoResultsHelper) {
    this.#lottoResultsHelper = lottoResultsHelper;
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#btnPayLottoElement = document.querySelector('.btn-pay-lotto');
  }

  #addEvent() {
    this.#btnPayLottoElement.addEventListener('click', (event) =>
      this.#handleClickBtn(event),
    );
  }

  #showPurchasedHistory() {
    const purchasedHistoryElement = document.querySelector('.purchase-history');

    purchasedHistoryElement.classList.remove('hidden');

    HtmlTextInjectorWithGameResults.injectorLottoTickets(
      this.#lottoResultsHelper.lottoTickets,
    );
  }

  #showWinningCriteria() {
    const winningCriteriaElement = document.querySelector('.winning-criteria');
    const btnCheckResult = document.querySelector('.btn-check-result');

    winningCriteriaElement.classList.remove('hidden');
    btnCheckResult.classList.remove('hidden');
  }

  #closePurchasedHistoryElement() {
    const purchaseHistoryElement = document.querySelector('.purchase-history');

    if (!purchaseHistoryElement.classList.contains('hidden'))
      purchaseHistoryElement.classList.add('hidden');
  }

  #closeWinningCriteriaElement() {
    const winningCriteriaElement = document.querySelector('.winning-criteria');

    if (!winningCriteriaElement.classList.contains('hidden'))
      winningCriteriaElement.classList.add('hidden');
    this.#clearWinningCriteriaInputValue();
  }

  #clearWinningCriteriaInputValue() {
    const winningCriteriaInputElementList = document.querySelectorAll(
      '.winning-criteria input',
    );

    winningCriteriaInputElementList.forEach((el) => {
      // eslint-disable-next-line
      el.value = '';
    });
  }

  /**
   *
   * @param {Event} event
   */
  #handleClickBtn(event) {
    event.preventDefault();

    this.#closePurchasedHistoryElement();
    this.#closeWinningCriteriaElement();

    const { value } = document.querySelector('#input-payment-amount');
    const errorMessageElement = document.querySelector(
      '.payment-amount .message-error',
    );

    try {
      this.#lottoResultsHelper.generateLottoMachine(value);

      this.#showWinningCriteria();
      this.#showPurchasedHistory();

      handleErrorMessage(errorMessageElement);
    } catch (error) {
      handleErrorMessage(errorMessageElement, error);
    }
  }
}

export default LottoMachineGenerator;

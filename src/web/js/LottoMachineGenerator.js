import HtmlTextInjectorWithGameResults from './HtmlTextInjectorWithGameResults';
import { handleErrorMessage } from './utils';

class LottoMachineGenerator {
  #lottoResultsHelper;

  #btnPayLottoEl;

  constructor(lottoResultsHelper) {
    this.#lottoResultsHelper = lottoResultsHelper;
    this.#assignElement();
    this.#addEvent();
  }

  // get lottoMachine() {
  //   return this.#lottoMachine;
  // }

  #assignElement() {
    this.#btnPayLottoEl = document.querySelector('.btn-payLotto');
  }

  #addEvent() {
    this.#btnPayLottoEl.addEventListener('click', (event) =>
      this.#handleClickBtn(event),
    );
  }

  #showPurchasedHistory() {
    const purchasedHistoryEl = document.querySelector('.purchasedHistory');

    purchasedHistoryEl.classList.remove('hidden');

    HtmlTextInjectorWithGameResults.injectorLottoTickets(
      this.#lottoResultsHelper.lottoTickets,
    );
  }

  #showWinningCriteria() {
    const winningCriteriaEl = document.querySelector('.winningCriteria');

    const btnCheckResult = document.querySelector('.btn-checkResult');

    winningCriteriaEl.classList.remove('hidden');
    btnCheckResult.classList.remove('hidden');
  }

  #handleClickBtn(event) {
    event.stopPropagation();
    const { value } = document.querySelector('#input-paymentAmount');
    const errorMessageEl = document.querySelector(
      '.paymentAmount .message-error',
    );

    try {
      this.#lottoResultsHelper.generateLottoMachine(value);

      this.#showWinningCriteria();
      this.#showPurchasedHistory();
    } catch (error) {
      handleErrorMessage(errorMessageEl, error);
    }
  }
}

export default LottoMachineGenerator;

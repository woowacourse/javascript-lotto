import CheckWinningLottosView from '../views/CheckWinningLottosView.js';
import { $ } from '../utils/utils.js';
import { SELECTOR } from '../constants/constants.js';
import { changeProfitToProfitRate } from '../utils/utils.js';

export default class CheckWinningLottosController {
  #view = new CheckWinningLottosView();

  constructor(lottoMachine) {
    this.machine = lottoMachine;
    this.#view.bindEvent(
      $(SELECTOR.ID.CHECK_RESULT_BUTTON),
      'click',
      this.handleClickCheckResultButton.bind(this)
    );
    this.#view.bindEvent(
      $(SELECTOR.ID.MODAL_CLOSE_BUTTON),
      'click',
      this.handleCloseModal.bind(this)
    );
    this.#view.bindEvent(
      $(SELECTOR.ID.MODAL_RETRY_BUTTON),
      'click',
      this.handleRetryButton.bind(this)
    );
  }

  handleClickCheckResultButton(e) {
    e.preventDefault();
    try {
      const inputWinningNumbers = this.#view.getInputWinningNumbers();
      const winningNumbers = inputWinningNumbers.splice(0, 6);
      const bonusNumber = inputWinningNumbers[0];
      this.machine.countWinLottos(winningNumbers, bonusNumber);
      this.#view.renderWinLottosCountInModal(
        this.machine.winLottos,
        this.machine.winLottosWithBonus
      );
      this.#view.renderProfitRateInModal(
        changeProfitToProfitRate(
          this.machine.getProfit(),
          this.machine.inputMoney
        )
      );
      this.#view.openModal();
    } catch (error) {
      alert(error.message);
    }
  }

  handleCloseModal() {
    $(SELECTOR.CLASS.MODAL).classList.toggle('show');
    this.machine.resetWinLottos();
  }

  handleRetryButton() {
    this.machine.resetMachine();
    this.#view.closeModal();
    this.#view.ablePurchase();
    this.#view.hideLottoContainers();
    this.#view.clearWinningNumbersInput();
    this.#view.clearMoneyInput();
    this.#view.resetToggle();
  }
}

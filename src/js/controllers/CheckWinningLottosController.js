import WinningLottosModalView from '../views/WinningLottosModalView.js';
import WinningNumbersInputView from '../views/WinningNumbersInputView.js';
import { $ } from '../utils/utils.js';
import { SELECTOR } from '../constants/constants.js';
import { changeProfitToProfitRate } from '../utils/utils.js';

export default class CheckWinningLottosController {
  constructor(lottoMachine) {
    this.machine = lottoMachine;
    this.inputView = new WinningNumbersInputView();
    this.modalView = new WinningLottosModalView();

    this.modalView.bindEvent(
      $(SELECTOR.ID.CHECK_RESULT_BUTTON),
      'click',
      this.handleClickCheckResultButton.bind(this)
    );
    this.modalView.bindEvent(
      $(SELECTOR.ID.MODAL_CLOSE_BUTTON),
      'click',
      this.handleCloseModal.bind(this)
    );
    this.modalView.bindEvent(
      $(SELECTOR.ID.MODAL_RETRY_BUTTON),
      'click',
      this.handleRetryButton.bind(this)
    );
  }

  // 핸들러
  handleClickCheckResultButton(e) {
    e.preventDefault();
    try {
      const inputWinningNumbers = this.inputView.getInputWinningNumbers();
      const winningNumbers = inputWinningNumbers.splice(0, 6);
      const bonusNumber = inputWinningNumbers[0];
      this.machine.countWinLottos(winningNumbers, bonusNumber);
      this.modalView.renderWinLottosCountInModal(
        this.machine.winLottos,
        this.machine.winLottosWithBonus
      );
      this.modalView.renderProfitRateInModal(
        changeProfitToProfitRate(
          this.machine.getProfit(),
          this.machine.inputMoney
        )
      );
      this.modalView.toggleModal();
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
    this.modalView.toggleModal();
    this.modalView.ablePurchase();
    this.modalView.hideLottoContainers();
    this.modalView.clearWinningNumbersInput();
    this.modalView.clearMoneyInput();
    this.modalView.resetToggle();
  }
}

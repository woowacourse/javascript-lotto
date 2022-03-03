import CheckWinningLottosView from '../views/CheckWinningLottosView.js';
import { $ } from '../utils/utils.js';
import { SELECTOR } from '../constants/constants.js';

export default class CheckWinningLottosController {
  #view = new CheckWinningLottosView();

  constructor(lottoMachine) {
    this.machine = lottoMachine;
    this.#view.bindEvent(
      $(SELECTOR.ID.CHECK_RESULT_BUTTON),
      'click',
      this.handleClickCheckResultButton.bind(this)
    );
  }

  handleClickCheckResultButton(e) {
    e.preventDefault();
    const inputWinningNumbers = this.#view.getInputWinningNumbers();
    const winningNumbers = inputWinningNumbers.splice(0, 6);
    const bonusNumber = inputWinningNumbers[0];
    this.machine.countWinLottos(winningNumbers, bonusNumber);
    this.#view.renderWinLottosCountInModal(
      this.machine.winLottos,
      this.machine.winLottosWithBonus
    );
    // ToDo: 모달창 오픈
    this.#view.openModal();
  }
}

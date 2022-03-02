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
    this.machine.checkWinLottos(winningNumbers, bonusNumber);
    // ToDo: 모달창 오픈
    const modal = document.querySelector('.modal');
    modal.classList.toggle('show');
  }
}

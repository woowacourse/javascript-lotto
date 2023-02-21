import { $ } from '../util/querySelector.js';
import getFormData from '../util/getFormData.js';

class WinningLottoInputView {
  #submitWinningLotto;

  constructor(controllerFunction) {
    this.#submitWinningLotto = controllerFunction;
    this.#setListener();
  }

  show() {
    $('#winningLottoInputMenu').classList.remove('hidden');
  }
}

export default WinningLottoInputView;

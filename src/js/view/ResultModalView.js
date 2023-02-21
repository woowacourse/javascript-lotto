import { $ } from '../util/querySelector.js';
import { GAME_VALUE } from '../constants/index.js';

class ResultModalView {
  #submitRestart;

  constructor(controllerFunction) {
    this.#submitRestart = controllerFunction;
    this.#setListeners();
  }

  show() {
    $('#resultModal').classList.remove('hidden');
  }
}

export default ResultModalView;

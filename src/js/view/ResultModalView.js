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

  hide() {
    $('#resultModal').classList.add('hidden');
  }
}

export default ResultModalView;

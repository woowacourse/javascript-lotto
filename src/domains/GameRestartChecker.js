import { ERROR_MESSAGES, RESTART_KEY } from '../constants';
import { checkDefinedInputValue, isValidRestartInputForm } from '../utils';

class GameRestartChecker {
  #restartKey = '';

  /**
   *
   * @param {string} restartInput
   */
  constructor(restartInput) {
    this.#validateRestartInput(restartInput);
  }

  get isRestart() {
    return this.#restartKey === RESTART_KEY.restart;
  }

  /**
   *
   * @param {string} restartInput
   */
  #validateRestartInput(restartInput) {
    checkDefinedInputValue(restartInput);

    if (!isValidRestartInputForm(restartInput)) {
      throw new Error(ERROR_MESSAGES.invalidRestartInputForm);
    }

    this.#restartKey = restartInput;
  }
}

export default GameRestartChecker;

import { ERROR_MESSAGES, VARIABLE_ALIAS } from '../../constant/Messages';
import Validation from './Validation';

class RestartValidator {
  static name = VARIABLE_ALIAS.restartVar;
  static restartArray = ['y', 'Y', 'n', 'N'];

  static validateIsIncluded(restartInput) {
    if (!Validation.isIncluded(this.restartArray, restartInput)) {
      throw new Error(
        `${ERROR_MESSAGES.prefix}${ERROR_MESSAGES.isNotRestart(this.name, this.restartArray)}`
      );
    }
  }
}

export default RestartValidator;

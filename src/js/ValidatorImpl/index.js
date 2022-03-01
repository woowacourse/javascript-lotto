import Validator from '../EventListener/Validator.js';
import { ERROR_MESSAGE } from '../constant/index.js';

export default class ValidatorImpl extends Validator {
  validateFare(fare) {
    if (!this.checkFunctions.isEnoughFare(fare)) {
      throw new Error(ERROR_MESSAGE.LACK_OF_FARE);
    }
  }
}

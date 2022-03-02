import Validator from '../EventListener/Validator.js';
import { LOTTO_PRICE, ERROR_MESSAGE } from '../constant/index.js';

export default class ValidatorImpl extends Validator {
  constructor() {
    super();
    this.checkFunctions = {
      isLackFare(fare) {
        return fare < LOTTO_PRICE;
      },
    };
  }

  validateFare(fare) {
    if (this.checkFunctions.isLackFare(fare)) {
      throw new Error(ERROR_MESSAGE.LACK_OF_FARE);
    }
  }
}

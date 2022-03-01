import { LOTTO_PRICE } from '../constant/index.js';

export default class Validator {
  constructor() {
    this.checkFunctions = {
      isEnoughFare(fare) {
        return fare >= LOTTO_PRICE;
      },
    };
  }

  validateFare(fare) {}
}

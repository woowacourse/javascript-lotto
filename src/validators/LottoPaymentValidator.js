import { ERROR_MESSAGES } from '../constants/messages';

const LottoPaymentValidator = {
  validate(price) {
    this.validateDividedUnit(price);
  },

  isDividedUnit(price) {
    return price % 1000 === 0;
  },

  validateDividedUnit(price) {
    if (!this.isDividedUnit(price)) {
      throw new Error(ERROR_MESSAGES.invalidDividedUnit);
    }
  },
};

export default LottoPaymentValidator;

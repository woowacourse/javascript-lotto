import checkUnit from './amount.js';
import { LOTTO } from '../../constants/values.js';

const Inputs = {
  amount(amount, { onError: errorCallback }) {
    try {
      return this.checkAmount(amount);
    } catch (error) {
      errorCallback(error.message);

      return { isValid: false };
    }
  },

  checkAmount(amount) {
    checkUnit(amount, LOTTO.UNIT);

    return { isValid: true };
  },
};

export default Inputs;

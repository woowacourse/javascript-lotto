import checkUnit from './amount.js';
import Console from '../utils/Console.js';
import { UNIT } from '../constants/values.js';

const Inputs = {
  async amount(amount, { onError: errorCallback }) {
    try {
      return this.checkAmount(amount);
    } catch (error) {
      Console.print(error.message);

      return await errorCallback({ onError: errorCallback });
    }
  },

  checkAmount(amount) {
    checkUnit(amount, UNIT);

    return Number(amount);
  },
};

export default Inputs;

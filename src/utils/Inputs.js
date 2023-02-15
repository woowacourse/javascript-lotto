import { QUERY } from '../constants/message.js';
import Console from './Console.js';

const Inputs = {
  async readAmount() {
    const amount = await Console.readLine(QUERY.AMOUNT);

    return amount;
  },
};

export default Inputs;

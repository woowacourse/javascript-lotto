import { QUERY } from '../constants/message.js';
import Console from './Console.js';

const Inputs = {
  async readAmount() {
    const amount = await Console.readLine(QUERY.AMOUNT);

    return amount;
  },

  async readWinningNumbers() {
    const winningNumbers = (await Console.readLine(QUERY.WINNING_NUMBERS)).split(',');

    return winningNumbers;
  },

  async readBonusNumber() {
    const bonusNumber = await Console.readLine(QUERY.BONUS_NUMBERS);

    return bonusNumber;
  },

  async readRetry() {
    const retry = await Console.readLine(QUERY.RETRY);

    return retry;
  },
};

export default Inputs;

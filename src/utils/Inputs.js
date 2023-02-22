import { QUERY } from '../constant/constants.js';
import ValidationInputs from '../validator/ValidationInputs';
import Console from './Console.js';

const Inputs = {
  async readAmount() {
    const amount = await Console.readLine(QUERY.AMOUNT);

    return ValidationInputs.amount(amount, this.readAmount.bind(this));
  },

  async readWinningNumbers() {
    const winningNumbers = await Console.readLine(QUERY.WINNING_NUMBERS);

    return ValidationInputs.winningNumbers(winningNumbers, this.readWinningNumbers.bind(this));
  },

  async readBonusNumber() {
    const bonusNumber = await Console.readLine(QUERY.BONUS_NUMBERS);

    return ValidationInputs.bonusNumber(bonusNumber, this.readBonusNumber.bind(this));
  },

  async readRetry() {
    const command = await Console.readLine(QUERY.RETRY);

    return ValidationInputs.retry(command, this.readRetry.bind(this));
  },
};

export default Inputs;

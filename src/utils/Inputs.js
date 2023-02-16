import { QUERY } from '../constants/message.js';
import Validator from '../validator/index.js';
import Console from './Console.js';

const Inputs = {
  async readAmount({ onError } = { onError: null }) {
    const amount = await Console.readLine(QUERY.AMOUNT);

    return await Validator.Inputs.amount(amount, {
      onError: onError ?? this.readAmount,
    });
  },

  async readWinningNumbers({ onError } = { onError: null }) {
    const winningNumbers = await Console.readLine(QUERY.WINNING_NUMBERS);

    return await Validator.Inputs.winningNumbers(winningNumbers, {
      onError: onError ?? this.readWinningNumbers,
    });
  },

  async readBonusNumber({ onError } = { onError: null }) {
    const bonusNumber = await Console.readLine(QUERY.BONUS_NUMBERS);

    return await Validator.Inputs.bonusNumber(bonusNumber, {
      onError: onError ?? this.readBonusNumber,
    });
  },

  async readRetry() {
    const retry = await Console.readLine(QUERY.RETRY);

    return retry;
  },
};

export default Inputs;

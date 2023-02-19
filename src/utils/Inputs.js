import QUERY from '../constants/query.js';
import ValidationInputs from '../validator/ValidationInputs';
import Console from './Console.js';

const Inputs = {
  async readAmount({ onError } = { onError: null }) {
    const amount = await Console.readLine(QUERY.AMOUNT);

    return await ValidationInputs.amount(amount, {
      onError: onError ?? this.readAmount,
    });
  },

  async readWinningNumbers({ onError } = { onError: null }) {
    const winningNumbers = await Console.readLine(QUERY.WINNING_NUMBERS);

    return await ValidationInputs.winningNumbers(winningNumbers, {
      onError: onError ?? this.readWinningNumbers,
    });
  },

  async readBonusNumber({ onError } = { onError: null }) {
    const bonusNumber = await Console.readLine(QUERY.BONUS_NUMBERS);

    return await ValidationInputs.bonusNumber(bonusNumber, {
      onError: onError ?? this.readBonusNumber,
    });
  },

  async readRetry({ onError } = { onError: null }) {
    const command = await Console.readLine(QUERY.RETRY);

    return await ValidationInputs.retry(command, {
      onError: onError ?? this.readRetry,
    });
  },
};

export default Inputs;

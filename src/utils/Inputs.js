import QUERY from '../constants/query.js';
import ValidationInputs from '../validator/ValidationInputs';
import Console from './Console.js';

const Inputs = {
  async readAmount(onError = null) {
    const amount = await Console.readLine(QUERY.AMOUNT);

    return await ValidationInputs.amount(amount, onError ?? this.readAmount.bind(this));
  },

  async readWinningNumbers(onError = null) {
    const winningNumbers = await Console.readLine(QUERY.WINNING_NUMBERS);

    return await ValidationInputs.winningNumbers(
      winningNumbers,
      onError ?? this.readWinningNumbers.bind(this)
    );
  },

  async readBonusNumber(onError = null) {
    const bonusNumber = await Console.readLine(QUERY.BONUS_NUMBERS);

    return await ValidationInputs.bonusNumber(
      bonusNumber,
      onError ?? this.readBonusNumber.bind(this)
    );
  },

  async readRetry(onError = null) {
    const command = await Console.readLine(QUERY.RETRY);

    return await ValidationInputs.retry(command, onError ?? this.readRetry.bind(this));
  },
};

export default Inputs;

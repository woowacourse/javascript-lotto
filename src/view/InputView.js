import { SYMBOL } from '../constant/constants.js';
import { INPUT_MESSAGES } from '../constant/messages.js';
import ReadLine from '../utils/readLineAsync.js';
import { validateRestartResponse } from '../utils/validation.js';

const InputView = {
  async readNumber(message, validate) {
    try {
      const number = Number(await ReadLine.readLineAsync(message));

      validate(number);

      return number;
    } catch (error) {
      console.log(error.message);
      return this.readNumber(message, validate);
    }
  },

  async readWinningNumbers() {
    const numbers = (await ReadLine.readLineAsync(INPUT_MESSAGES.winningNumber))
      .split(SYMBOL.delimiter)
      .map((number) => Number(number));

    return numbers;
  },

  async readRestart() {
    try {
      const restartResponse = await ReadLine.readLineAsync(INPUT_MESSAGES.restart);
      validateRestartResponse(restartResponse);

      return restartResponse;
    } catch (error) {
      console.log(error.message);
      return this.readRestart();
    }
  },
};

export default InputView;

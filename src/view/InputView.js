import readLineAsync from './readLineAsync.js';
import OutputView from './OutputView.js';
import { INPUT_MESSAGE } from '../constants/message.js';
import { DECIMAL } from './constants.js';
import {
  validateMoney,
  validateLottoNumber,
  validateBonus,
  validateRestart,
} from '../domain/validation.js';

const InputView = {
  async readMoney() {
    try {
      const input = await readLineAsync(INPUT_MESSAGE.READ_MONEY);
      const money = parseInt(input, DECIMAL);
      validateMoney(money);
      return money;
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      return this.readMoney();
    }
  },
  async readWinningLotto() {
    try {
      const input = await readLineAsync(INPUT_MESSAGE.READ_WINNING_LOTTO);
      const winningLotto = input
        ?.split(',')
        .map((item) => parseInt(item, DECIMAL));
      validateLottoNumber(winningLotto);
      return winningLotto;
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      return this.readWinningLotto();
    }
  },
  async readBonus(winningLotto) {
    try {
      const input = await readLineAsync(INPUT_MESSAGE.READ_BONUS);
      const bonus = parseInt(input, DECIMAL);
      validateBonus(bonus, winningLotto);
      return bonus;
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      return this.readBonus(winningLotto);
    }
  },
  async readReStart() {
    try {
      const input = await readLineAsync(INPUT_MESSAGE.READ_RESTART);
      const lowerCaseInput = input.toLowerCase();
      validateRestart(lowerCaseInput);
      return lowerCaseInput;
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      return this.readReStart();
    }
  },
};

export default InputView;

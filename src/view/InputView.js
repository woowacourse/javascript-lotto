import readLineAsync from './readLineAsync.js';
import { INPUT_MESSAGE } from '../constants/message.js';
import { validateMoney, validateLottoNumber, validateBonus } from '../domain/validation.js';
import CONFIG from '../constants/config.js';

const InputView = {
  async readMoney() {
    const input = await readLineAsync(INPUT_MESSAGE.READ_MONEY);
    const money = parseInt(input, CONFIG.DECIMAL);
    validateMoney(money);
    return money;
  },
  async readWinningLotto() {
    const input = await readLineAsync(INPUT_MESSAGE.READ_WINNING_LOTTO);
    const winningLotto = input?.split(',').map((item) => parseInt(item, CONFIG.DECIMAL));
    validateLottoNumber(winningLotto);
    return winningLotto;
  },
  async readBonus(winningLotto) {
    const input = await readLineAsync(INPUT_MESSAGE.READ_BONUS);
    const bonus = parseInt(input, CONFIG.DECIMAL);
    validateBonus(bonus, winningLotto);
    return bonus;
  },
  async readReStart() {
    const input = await readLineAsync(INPUT_MESSAGE.READ_RESTART);
    const lowerCaseInput = input.toLowerCase();

    return !(lowerCaseInput === CONFIG.ANSWER_NO) && lowerCaseInput === CONFIG.ANSWER_YES;
  },
};

export default InputView;

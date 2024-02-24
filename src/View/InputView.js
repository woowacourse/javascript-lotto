import readLine from 'readline';
import PROGRESS_MESSAGE from '../Constants/Messages/progressMessage';
import ERROR_MESSAGE from '../Constants/Messages/errorMessage';
import DELIMITER from '../Constants/delimiter';
import stdObj from '../Constants/stdObj';
import AppError from '../Error/AppError';
import RETRY from '../Constants/retry';

const InputView = {
  async readMoney() {
    const moneyInput = await this.readLineAsync(PROGRESS_MESSAGE.INPUT_MONEY);

    return Number(moneyInput);
  },

  async readWinLottoNumbers() {
    const winLottoInput = await this.readLineAsync(PROGRESS_MESSAGE.INPUT_WINNING_LOTTO);

    return winLottoInput.split(DELIMITER.LOTTO_NUMBER_SEPERATOR).map(Number);
  },

  async readBonusNumber() {
    const bonusNumberInput = await this.readLineAsync(PROGRESS_MESSAGE.INPUT_BONUS_NUMBER);

    return Number(bonusNumberInput);
  },

  async readIsRetryRun() {
    const retryInput = await this.readLineAsync(PROGRESS_MESSAGE.SELECT_RE_RUN);

    if (RETRY.YES.includes(retryInput)) return true;
    if (RETRY.NO.includes(retryInput)) return false;
    throw new AppError(ERROR_MESSAGE.INVALID_RETRY_INPUT);
  },

  async readLineAsync(message) {
    return new Promise((resolve) => {
      const rl = readLine.createInterface(stdObj);

      rl.question(message, (input) => {
        resolve(input);
        rl.close();
      });
    });
  },
};

export default InputView;

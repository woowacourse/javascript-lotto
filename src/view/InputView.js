import Lotto from '../domain/Lotto';
import WinningLotto from '../domain/WinningLotto';
import Console from '../utils/Console';
import Validation from '../Validation';
import { MESSAGES } from '../constants';

const InputView = {
  async readMoney() {
    return Console.repeatWhile(async () => {
      const money = await Console.readLine(MESSAGES.GET_MONEY_INPUT);
      Validation.validateMoney(money);
      return Number(money);
    });
  },

  async readWinningLotto() {
    return Console.repeatWhile(async () => {
      const lotto = await this.readLotto();
      const bonusNumber = await this.readBonusNumber();

      return new WinningLotto(lotto.getLottoNumbers(), bonusNumber);
    });
  },

  async readLotto() {
    return Console.repeatWhile(async () => {
      const readLottoNumbers = await Console.readLine(MESSAGES.GET_WINNING_NUMBERS);
      const lottoNumbers = readLottoNumbers
        .split(',')
        .map((number) => number.trim())
        .map(Number);
      return new Lotto(lottoNumbers);
    });
  },

  async readBonusNumber() {
    return Console.repeatWhile(async () => {
      const bonusNumber = await Console.readLine(MESSAGES.GET_BONUS_NUMBER);
      Validation.validateLottoNumber(bonusNumber);
      return Number(bonusNumber);
    });
  },

  async readRestartCommand() {
    return Console.repeatWhile(async () => {
      const restartCommand = await Console.readLine(MESSAGES.GET_RESTART_COMMAND);
      Validation.validateRestartCommand(restartCommand);
      return restartCommand;
    });
  },
};

export default InputView;

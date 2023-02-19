import Messages from '../constant/Messages';
import Lotto from '../domain/lotto/Lotto';
import WinningLotto from '../domain/WinningLotto';
import Console from '../utils/Console';
import Validation from '../Validation';

const InputView = {
  /**
   * @returns {Promise<number>}
   */
  async readMoney() {
    return Console.repeatWhile(async () => {
      const money = await Console.readLine(Messages.INPUT_MONEY);
      Validation.validateMoney(money);
      return Number(money);
    });
  },

  /**
   * @returns {Promise<WinningLotto>}
   */
  async readWinningLotto() {
    return Console.repeatWhile(async () => {
      const lotto = await this.readLotto();
      const bonusNumber = await this.readBonusNumber();

      return new WinningLotto(lotto.getLottoNumbers(), bonusNumber);
    });
  },

  /**
   * @returns {Promise<Lotto>}
   */
  async readLotto() {
    return Console.repeatWhile(async () => {
      const readWinningNumbers = await Console.readLine(Messages.INPUT_WINNING_NUMBERS);
      const lottoNumbers = readWinningNumbers
        .split(',')
        .map((number) => number.trim())
        .map(Number);
      return new Lotto(lottoNumbers);
    });
  },

  /**
   *
   * @returns {Promise<number>}
   */
  async readBonusNumber() {
    return Console.repeatWhile(async () => {
      const bonusNumber = await Console.readLine(Messages.INPUT_BONUS_NUIMBER);
      Validation.validateLottoNumber(bonusNumber);
      return Number(bonusNumber);
    });
  },

  /**
   *
   * @returns {Promise<string>}
   */
  async readRestartCommand() {
    return Console.repeatWhile(async () => {
      const restartCommand = await Console.readLine('다시 시작하시겠습니까? (y/n) ');
      Validation.validateRestartCommand(restartCommand);
      return restartCommand;
    });
  },
};

export default InputView;

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
      const money = await Console.readLine('구입금액을 입력해 주세요.');
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
      const readWinningNumbers = await Console.readLine('당첨 번호를 입력해 주세요. ');
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
      const bonusNumber = await Console.readLine('보너스 번호를 입력해 주세요.');
      Validation.validateLottoNumber(bonusNumber);
      return Number(bonusNumber);
    });
  },

  /**
   *
   * @returns {Promise<'y' | 'n'>}
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

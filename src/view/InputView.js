import Console from '../utils/Console';

const InputView = {
  async readMoney() {
    const money = await Console.readLine('구입금액을 입력해 주세요.');
    return Number(money);
  },

  async readWinningNumbers() {
    const readWinningNumbers = await Console.readLine('당첨 번호를 입력해 주세요. ');
    return readWinningNumbers.split(',').map(Number);
  },

  async readBonusNumber() {
    const bonusNumber = await Console.readLine('보너스 번호를 입력해 주세요.');
    return Number(bonusNumber);
  },

  async readRestartCommand() {
    const restartCommand = await Console.readLine('다시 시작하시겠습니까? (y/n) ');
    return restartCommand;
  },
};

export default InputView;

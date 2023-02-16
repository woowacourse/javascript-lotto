import Console from '../utils/Console.js';

const InputView = {
  async readMoney() {
    const money = await Console.read('구입금액을 입력해 주세요.');
    return money;
  },
  async readWinningNumber() {
    const winningNumber = await Console.read('당첨 번호를 입력해 주세요.');
    return winningNumber;
  },
  async readBonusNumber() {
    const bonusNumber = await Console.read('보너스 번호를 입력해 주세요.');
    return bonusNumber;
  },
  async readRetryCommand() {
    const command = await Console.read('다시 시작하시겠습니까? (y/n)');
    return command;
  },
};

export default InputView;

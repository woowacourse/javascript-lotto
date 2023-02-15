const Console = require('../util/Console');

const InputView = {
  async readPurchaseAmount() {
    const purchaseAmount = await Console.readLine('구입금액을 입력해 주세요.');
    return purchaseAmount;
  },

  async readWinnigNumber() {
    const winningNumber = await Console.readLine('당첨 번호를 입력해 주세요.');
    return winningNumber;
  },

  async readBonusNumber() {
    const bonusNumber = await Console.readLine('보너스 번호를 입력해 주세요.');
    return bonusNumber;
  },

  async readRestartCommand() {
    const restartCommand = await Console.readLine('> 다시 시작하시겠습니까? (y/n)');
    return restartCommand;
  },
};

module.exports = InputView;

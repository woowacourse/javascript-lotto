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
};

module.exports = InputView;

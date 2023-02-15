const Console = require('../util/Console');

const InputView = {
  async readPurchaseAmount() {
    const purchaseAmount = await Console.readLine('구입금액을 입력해 주세요.');
    return purchaseAmount;
  },
};

module.exports = InputView;

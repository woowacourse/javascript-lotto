const Console = require('../util/Console');

const OutputView = {
  printPurchaseQuantity(quantity) {
    Console.print(`${quantity}개를 구매했습니다.`);
  },

  printLottos(lottos) {
    lottos.forEach((lotto) => {
      Console.print(lotto);
    });
  },
};

module.exports = OutputView;

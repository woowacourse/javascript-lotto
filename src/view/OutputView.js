const { OUTPUT_MESSAGE, OUTPUT_MESSAGE_METHOD } = require('../constant/Message');
const Console = require('../util/Console');

const OutputView = {
  printEmptyLine() {
    Console.print('');
  },

  printPurchaseQuantity(quantity) {
    Console.print(`${quantity}개를 구매했습니다.`);
  },

  printLottos(lottos) {
    lottos.forEach((lotto) => {
      Console.print(lotto);
    });
  },

  printRanking(ranking) {
    Console.print(OUTPUT_MESSAGE.WINNING_STATISTICSS_HEADER);
    Object.entries(ranking).forEach(([rank, count]) => {
      Console.print(OUTPUT_MESSAGE_METHOD.RANK(rank, count));
    });
  },

  printProfitRate(profitRate) {
    Console.print(OUTPUT_MESSAGE_METHOD.PROFIT_RATE(profitRate));
  },

  printErrorMessage(errorMessage) {
    Console.print(errorMessage);
  },
};

module.exports = OutputView;

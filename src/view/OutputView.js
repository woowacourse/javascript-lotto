const { OUTPUT_MESSAGE, OUTPUT_MESSAGE_METHOD, ERROR_MESSAGE } = require('../constant/message');
const Console = require('../util/Console');

const OutputView = {
  printEmptyLine() {
    Console.print('');
  },

  printPurchaseQuantity(quantity) {
    Console.print(OUTPUT_MESSAGE_METHOD.PURCHASE_QUANTITY(quantity));
  },

  printPurchaserLottos(lottos) {
    lottos.forEach((lotto) => {
      Console.print(lotto);
    });
  },

  printPurchaseStatus(quantity, lottos) {
    OutputView.printPurchaseQuantity(quantity);
    OutputView.printPurchaserLottos(lottos);
    OutputView.printEmptyLine();
  },

  printRanking(ranking) {
    Console.print(OUTPUT_MESSAGE.WINNING_STATISTICS_HEADER);
    Object.entries(ranking).forEach(([rank, count]) => {
      Console.print(OUTPUT_MESSAGE_METHOD.RANK(rank, count));
    });
  },

  printProfitRate(profitRate) {
    Console.print(OUTPUT_MESSAGE_METHOD.PROFIT_RATE(profitRate));
  },

  printStatistics(ranking, profitRate) {
    OutputView.printRanking(ranking);
    OutputView.printProfitRate(profitRate);
    OutputView.printEmptyLine();
  },

  printErrorMessage(errorMessage) {
    OutputView.printEmptyLine();
    Console.print(ERROR_MESSAGE.PREFIX + errorMessage);
    OutputView.printEmptyLine();
  },
};

module.exports = OutputView;

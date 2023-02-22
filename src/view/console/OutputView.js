import {
  OUTPUT_MESSAGE,
  OUTPUT_MESSAGE_METHOD,
  ERROR_MESSAGE,
} from '../../constant/console/message';
import ConsoleIO from '../../util/console/ConsoleIO';

const OutputView = {
  printEmptyLine() {
    ConsoleIO.print('');
  },

  printPurchaseQuantity(quantity) {
    ConsoleIO.print(OUTPUT_MESSAGE_METHOD.PURCHASE_QUANTITY(quantity));
  },

  printPurchaserLottos(lottos) {
    lottos.forEach((lotto) => {
      ConsoleIO.print(lotto);
    });
  },

  printPurchaseStatus(quantity, lottos) {
    OutputView.printPurchaseQuantity(quantity);
    OutputView.printPurchaserLottos(lottos);
    OutputView.printEmptyLine();
  },

  printRanking(ranking) {
    ConsoleIO.print(OUTPUT_MESSAGE.WINNING_STATISTICS_HEADER);
    Object.entries(ranking).forEach(([rank, count]) => {
      ConsoleIO.print(OUTPUT_MESSAGE_METHOD.RANK(rank, count));
    });
  },

  printProfitRate(profitRate) {
    ConsoleIO.print(OUTPUT_MESSAGE_METHOD.PROFIT_RATE(profitRate));
  },

  printStatistics(ranking, profitRate) {
    OutputView.printRanking(ranking);
    OutputView.printProfitRate(profitRate);
    OutputView.printEmptyLine();
  },

  printErrorMessage(errorMessage) {
    OutputView.printEmptyLine();
    ConsoleIO.print(ERROR_MESSAGE.PREFIX + errorMessage);
    OutputView.printEmptyLine();
  },
};

export default OutputView;

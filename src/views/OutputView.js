import Console from '../utils/Console';
import LOTTO_STATISTICS from '../constants/lotto-statistics';
import { OUTPUT_MESSAGES } from '../constants/messages';
import createWinningResult from '../utils/createWinningResult';

const OutputView = {
  printTicketCount(count) {
    Console.print(OUTPUT_MESSAGES.ticketCount(count));
  },

  printGeneratedLottos(lottos) {
    lottos.forEach((lotto) => {
      Console.print(lotto);
    });
  },

  printWinningStatics(statics) {
    Console.print(OUTPUT_MESSAGES.winningStatics);
    Console.print(OUTPUT_MESSAGES.winningStaticsOperation);
    this.printStatics(statics);
  },

  printStatics(statics) {
    const keys = Object.keys(LOTTO_STATISTICS);

    keys.forEach((key) => {
      const message = createWinningResult(key, statics[key]);
      Console.print(message);
    });
  },

  printTotalProfit(profit) {
    Console.print(OUTPUT_MESSAGES.totalProfit(profit));
  },

  printNewLine() {
    Console.print('');
  },
};

export default OutputView;

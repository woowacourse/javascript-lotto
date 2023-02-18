import messages from '../constants/messages';
import Console from '../utils/console';

const OutputView = {
  printMessage(message) {
    Console.print(message);
  },

  printLottos(lottos) {
    lottos.forEach(lotto => {
      Console.print(lotto.lottoNum);
    });
  },

  printStatistics(statistics) {
    Console.print(messages.STATISTICS_MESSAGE.OPENING);
    Console.print(messages.STATISTICS_MESSAGE.FIFTH + statistics.countOfRanks[4]);
    Console.print(messages.STATISTICS_MESSAGE.FOURTH + statistics.countOfRanks[3]);
    Console.print(messages.STATISTICS_MESSAGE.THIRD + statistics.countOfRanks[2]);
    Console.print(messages.STATISTICS_MESSAGE.SECOND + statistics.countOfRanks[1]);
    Console.print(messages.STATISTICS_MESSAGE.FIRST + statistics.countOfRanks[0]);

    Console.print(`총 수익률은 ${statistics.rateOfProfit}% 입니다.`);
  },
};

export default OutputView;

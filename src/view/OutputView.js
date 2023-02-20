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
    Console.print(messages.statisticsMessages.opening);
    Console.print(messages.statisticsMessages.fifth + statistics.ranks[4]);
    Console.print(messages.statisticsMessages.fourth + statistics.ranks[3]);
    Console.print(messages.statisticsMessages.third + statistics.ranks[2]);
    Console.print(messages.statisticsMessages.second + statistics.ranks[1]);
    Console.print(messages.statisticsMessages.first + statistics.ranks[0]);

    Console.print(`총 수익률은 ${statistics.rateOfProfit}% 입니다.`);
  },
};

export default OutputView;

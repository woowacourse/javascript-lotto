import { OUTPUT_MESSAGES, WINNING_RULE, NUMBER_DELIMITER } from '../constants';
import { Console } from '../utils';

const OutputView = {
  printLottoTickets(lottoTickets) {
    Console.print(`${lottoTickets.length}개를 구매했습니다.`);
    lottoTickets.forEach((lottoTicket) => {
      Console.print(`[${lottoTicket.join(`${NUMBER_DELIMITER} `)}]`);
    });
  },

  printStatistics(statisticsResult) {
    const { lottoTickets, divider, moneyUnit, countUnit } = OUTPUT_MESSAGES;
    Console.print(lottoTickets);
    Console.print(divider);

    WINNING_RULE.forEach(({ matchedCount, money }, key) => {
      Console.print(
        `${matchedCount}${countUnit} 일치 (${money.toLocaleString('ko-KR')}${moneyUnit}) - ${statisticsResult[key]}${countUnit}`,
      );
    });
  },

  printProfitRate(profitRate) {
    Console.print(
      `\n총 수익률은 ${profitRate}${OUTPUT_MESSAGES.profitUnit}입니다.`,
    );
  },

  printRestartGuide() {
    Console.print();
  },
};

export default OutputView;

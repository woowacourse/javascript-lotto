import { Console } from '../utils';
import { OUTPUT_MESSAGES, WINNING_RULE, NUMBER_DELIMITER } from '../constants';

const OutputView = {
  printLottoTickets(lottoTickets) {
    lottoTickets.forEach((lottoNumber) => {
      Console.print(
        `[${lottoNumber.sort((a, b) => a - b).join(`${NUMBER_DELIMITER} `)}]`,
      );
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

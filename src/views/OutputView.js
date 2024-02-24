import { OUTPUT_MESSAGES, WINNING_RULE, NUMBER_DELIMITER } from '../constants';
import Console from '../utils/Console';

const OutputView = {
  /**
   * @param {number[][]} lottoTickets
   */
  printLottoTickets(lottoTickets) {
    Console.print(OUTPUT_MESSAGES.purchasedLottoTickets);

    lottoTickets.forEach((lottoNumber) => {
      Console.print(
        `[${lottoNumber.sort((a, b) => a - b).join(`${NUMBER_DELIMITER} `)}]`,
      );
    });
  },
  /**
   * @param { @returns {1:number, 2:number ,3:number, 4:number, 5:number}} statisticsResult
   */
  printStatistics(statisticsResult) {
    const { lottoTickets, divider, moneyUnit, countUnit } = OUTPUT_MESSAGES;
    Console.print(lottoTickets);
    Console.print(divider);

    WINNING_RULE.forEach(({ matchedCount, isBonus, money }, key) => {
      Console.print(
        `${matchedCount}${countUnit} 일치${isBonus ? ', 보너스 볼 일치' : ''} (${money.toLocaleString('ko-KR')}${moneyUnit}) - ${statisticsResult[key]}${countUnit}`,
      );
    });
  },
  /**
   *
   * @param {number} profitRate
   */
  printProfitRate(profitRate) {
    Console.print(
      `\n총 수익률은 ${profitRate}${OUTPUT_MESSAGES.profitUnit}입니다.`,
    );
  },

  printRestartGameMessage() {
    Console.print(OUTPUT_MESSAGES.restartGame);
  },

  printEndGameMessage() {
    Console.print(OUTPUT_MESSAGES.endGame);
  },
  /**
   * @param {Error} error
   */
  printErrorMessage(error) {
    Console.print(error.message);
  },
};

export default OutputView;

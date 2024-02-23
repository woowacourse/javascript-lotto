/* eslint-disable max-lines-per-function */
import { OUTPUT_MESSAGES } from '../constant/Messages.js';
import OPTIONS from '../constant/Options.js';

const MESSAGES = OUTPUT_MESSAGES;

class OutputView {
  static print(message) {
    console.log(message);
  }

  static printIssueQuantity(issueQuantity) {
    this.print(MESSAGES.issueQuantity(issueQuantity));
  }

  static printLottoNumbersList(numbersList) {
    numbersList.forEach((numbers) => {
      this.print(MESSAGES.lottoNumbers(numbers));
    });
  }

  // eslint-disable-next-line max-lines-per-function
  static printWinningResult(winningResult, profitRate) {
    this.print(MESSAGES.statisticsTitle);
    this.print(MESSAGES.dividingLine);

    Object.entries(winningResult)
      .reverse()
      .slice(1)
      .forEach(([rank, count]) => {
        const { matchingCount, bonusMatch } = OPTIONS.RANK_CONDITION[rank];
        const bonusMessage = bonusMatch ? MESSAGES.bonusMatch : '';

        this.print(
          MESSAGES.statisticsResult(
            matchingCount,
            bonusMessage,
            OPTIONS.PRIZE_BY_RANK[rank].toLocaleString(),
            count
          )
        );
      });

    this.print(MESSAGES.profitRate(profitRate.toFixed(1)));
  }
}

export default OutputView;

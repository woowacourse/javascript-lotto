import RateOfReturnCalculator from '../../domain/RateOfReturnCalculator/RateOfReturnCalculator.js';
import WinningRank from '../../domain/WinningRank/WinningRank.js';
import { SYMBOLS } from '../symbols.js';

export const INPUT_MESSAGE = Object.freeze({
  buyLottoPrice: '> 구입금액을 입력해 주세요. ',
  winningNumber: '\n> 당첨 번호를 입력해 주세요. ',
  bonusNumber: '\n> 보너스 번호를 입력해 주세요. ',
  retryCommand: '\n> 다시 시작하시겠습니까? (y/n) ',
});

export const OUTPUT_MESSAGE = Object.freeze({
  winningLottoResultTitle: '\n당첨 통계\n--------------------',
});

export const FORMAT_MESSAGE = Object.freeze({
  lottoCountToString(lottoCount) {
    return `${lottoCount}개를 구매했습니다.`;
  },

  lottoNumbersToString(lottoNumbers) {
    return lottoNumbers
      .map((lottoNumber) => `[${lottoNumber.join(`${SYMBOLS.comma} `)}]`)
      .join('\n');
  },

  partialWinningStatisticsToString({ rank, prize, count }) {
    const { description } = WinningRank.RANK_RULE[rank];

    return `${description} (${prize.toLocaleString()}원) - ${count}개\n`;
  },

  winningStatisticsToString(winningRankResult) {
    return Object.entries(RateOfReturnCalculator.WINNING_PRIZE_DETAIL).reduceRight(
      (prevResult, [rank, prize]) => {
        const count = winningRankResult[rank] || 0;

        return prevResult + this.partialWinningStatisticsToString({ rank, prize, count });
      },
      SYMBOLS.emptyString,
    );
  },

  rateOfReturnToString(rateOfReturn) {
    return `총 수익률은 ${rateOfReturn}%입니다.`;
  },
});

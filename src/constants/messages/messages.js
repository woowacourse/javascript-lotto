import RateOfReturnCalculator from '../../domain/RateOfReturnCalculator/RateOfReturnCalculator.js';
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

  rankToString(rank) {
    if (rank === '1st') return '6개 일치';
    if (rank === '2nd') return '5개 일치, 보너스 볼 일치';
    if (rank === '3rd') return '5개 일치';
    if (rank === '4th') return '4개 일치';
    if (rank === '5th') return '3개 일치';

    return null;
  },

  partialWinningStatisticsToString({ rank, prize, count }) {
    return `${this.rankToString(rank)} (${prize.toLocaleString()}원) - ${count}개\n`;
  },

  winningStatisticsToString(winningRankDetail) {
    return Object.entries(RateOfReturnCalculator.WINNING_PRIZE_DETAIL).reduceRight(
      (prevResult, [rank, prize]) => {
        const count = winningRankDetail[rank] || 0;

        return prevResult + this.partialWinningStatisticsToString({ rank, prize, count });
      },
      SYMBOLS.emptyString,
    );
  },

  rateOfReturnToString(rateOfReturn) {
    return `총 수익률은 ${rateOfReturn}%입니다.`;
  },
});

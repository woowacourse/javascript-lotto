import { FORMAT_MESSAGE, OUTPUT_MESSAGE } from '../constants/messages/messages.js';

import Console from '../utils/console.js';

const OutputView = Object.freeze({
  /**
   * @param {number} lottoCount - 로또 개수
   */
  printLottoCount(lottoCount) {
    Console.print(FORMAT_MESSAGE.lottoCountToString(lottoCount));
  },

  /**
   * @param {import('../types/jsDoc.js').LottoNumber[]} lottoNumbers - 로또 번호들
   */
  printLottoNumbers(lottoNumbers) {
    Console.print(FORMAT_MESSAGE.lottoNumbersToString(lottoNumbers));
  },

  /**
   * @param {{rateOfReturn : number, winningRankResult : import('../types/jsDoc.js').WinningRankResult}} params - 수익률과 각 등수 별 당첨 횟수 객체가 담긴 객체
   */
  printDrawLottoResult({ rateOfReturn, winningRankResult }) {
    Console.print(OUTPUT_MESSAGE.winningStatisticsTitle);

    Console.print(
      FORMAT_MESSAGE.winningStatisticsToString(winningRankResult) +
        FORMAT_MESSAGE.rateOfReturnToString(rateOfReturn),
    );
  },
});

export default OutputView;

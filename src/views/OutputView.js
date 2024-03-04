import { FORMAT_MESSAGE, OUTPUT_MESSAGE } from '../constants/messages/messages.js';

// import Console from '../utils/console.js';

const OutputView = Object.freeze({
  /**
   * @param {number} lottoCount - 로또 개수
   */
  printLottoCount(lottoCount) {
    console.log(FORMAT_MESSAGE.lottoCountToString(lottoCount));
  },

  /**
   * @param {import('../types/jsDoc.js').LottoNumber[]} lottoNumbersArray - 로또 번호들
   */
  printLottoNumbersArray(lottoNumbersArray) {
    console.log(FORMAT_MESSAGE.lottoNumbersArrayToString(lottoNumbersArray));
  },

  /**
   * @param {{rateOfReturn : number, winningRankResult : import('../types/jsDoc.js').WinningRankResult}} params - 수익률과 각 등수 별 당첨 횟수 객체가 담긴 객체
   */
  printRaffleLottoResult({ rateOfReturn, winningRankResult }) {
    console.log(OUTPUT_MESSAGE.winningStatisticsTitle);

    console.log(
      FORMAT_MESSAGE.winningStatisticsToString(winningRankResult) +
        FORMAT_MESSAGE.rateOfReturnToString(rateOfReturn),
    );
  },
});

export default OutputView;

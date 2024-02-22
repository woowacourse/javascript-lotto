import { FORMAT_MESSAGE, OUTPUT_MESSAGE } from '../constants/messages/messages.js';

import Console from '../utils/console.js';

const OutputView = Object.freeze({
  printLottoCount(lottoCount) {
    Console.print(FORMAT_MESSAGE.lottoCountToString(lottoCount));
  },

  printLottoNumbers(lottoNumbers) {
    Console.print(FORMAT_MESSAGE.lottoNumbersToString(lottoNumbers));
  },

  printDrawLottoResult({ rateOfReturn, winningRankResult }) {
    Console.print(OUTPUT_MESSAGE.winningStatisticsTitle);

    Console.print(
      FORMAT_MESSAGE.winningStatisticsToString(winningRankResult) +
        FORMAT_MESSAGE.rateOfReturnToString(rateOfReturn),
    );
  },
});

export default OutputView;

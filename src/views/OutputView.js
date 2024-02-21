import Console from '../utils/console.js';

import { FORMAT_MESSAGE, OUTPUT_MESSAGE } from '../constants/messages/messages.js';

const OutputView = Object.freeze({
  printLottoCount(lottoCount) {
    Console.print(FORMAT_MESSAGE.lottoCountToString(lottoCount));
  },

  printLottoNumbers(lottoNumbers) {
    Console.print(FORMAT_MESSAGE.lottoNumbersToString(lottoNumbers));
  },

  printWinningLottoResult({ rateOfReturn, winningRankDetail }) {
    Console.print(OUTPUT_MESSAGE.winningLottoResultTitle);

    Console.print(
      FORMAT_MESSAGE.winningStatisticsToString(winningRankDetail) +
        FORMAT_MESSAGE.rateOfReturnToString(rateOfReturn),
    );
  },
});

export default OutputView;

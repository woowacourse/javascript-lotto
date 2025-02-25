import OutputView from './OutputView.js';
import { LINE_BREAK, OUTPUT_MESSAGE } from '../constants/constants.js';
import { printLottoRank } from '../utils/printLottoRank.js';

const LottoOutputView = {
  printStatistics(rank) {
    OutputView.print(OUTPUT_MESSAGE.STATISTICS);
    OutputView.print(OUTPUT_MESSAGE.LINE);
    printLottoRank(rank);
  },

  printLottoNumber(lottoMaker) {
    OutputView.print(`${lottoMaker.lottoList.length}${OUTPUT_MESSAGE.PURCHASE_COUNT}`);
    lottoMaker.lottoList.forEach((lotto) => {
      OutputView.print(lotto.numbers);
    });
    OutputView.print(LINE_BREAK);
  },

  printWinningRate(winningRate) {
    OutputView.print(OUTPUT_MESSAGE.WINNING_RATE.replace('{}', winningRate));
  },
};

export default LottoOutputView;

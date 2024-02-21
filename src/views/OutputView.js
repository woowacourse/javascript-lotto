import { FORMAT_MESSAGE } from '../constants/messages/messages.js';
import Console from '../utils/console.js';

const OutputView = Object.freeze({
  printLottoCount(lottoCount) {
    Console.print(FORMAT_MESSAGE.lottoCountToString(lottoCount));
  },

  printLottoNumbers(lottoNumbers) {
    Console.print(FORMAT_MESSAGE.lottoNumbersToString(lottoNumbers));
  },
});

export default OutputView;
